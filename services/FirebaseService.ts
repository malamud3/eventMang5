import {equalTo, get, getDatabase, orderByChild, query, ref, set} from "firebase/database";
import User from "../models/User";
import EventF, {EventStatus, EventType} from "../models/Event";

// Function to create a user object
export async function createUserObject(userid: string, userEmail: string, userName: string): Promise<void> {
    try {
        const db = getDatabase();
        const events: EventF[] = [];
        const friends: User[] = [];

        const userRef = ref(db, `users/${userid}`);
        await set(userRef, {
            userEmail,
            userName,
            events,
            friends,
        });
    } catch (error) {
        console.error("Error creating user object:", error);
        // Handle error
    }
}

// Function to create an event object
export async function createEvent(
    eventId: string,
    eventName: string,
    eventType: EventType,
    eventDateTime: Date,
    eventLocation: string,
    eventDescription: string,
    invitedUsers: (Record<string, string>)[] | null
): Promise<void> {
    try {
        const db = getDatabase();
        const eventRef = ref(db, `events/${eventId}`);
        await set(eventRef, {
            id: eventId,
            name: eventName,
            type: eventType,
            dateTime: eventDateTime.toISOString(),
            location: eventLocation,
            description: eventDescription,
            invited: invitedUsers,
        });
    } catch (error) {
        console.error("Error creating event object:", error);
        // Handle error
    }
}
// Function to find an event by its ID
export async function findEventById(eventId: string): Promise<EventF | null> {
    try {
        const db = getDatabase();
        const eventRef = ref(db, `events/${eventId}`);
        const snapshot = await get(eventRef);

        if (snapshot.exists()) {
            const eventData = snapshot.val();
            return eventData as EventF;
        } else {
            console.log("Event not found");
            return null;
        }
    } catch (error) {
        console.error("Error finding event by ID:", error);
        // Handle error
        return null;
    }
}

export async function addInvitedUserToEvent(eventId: string, userId: string): Promise<void> {
    try {
        const db = getDatabase();
        const eventRef = ref(db, `events/${eventId}`);
        const snapshot = await get(eventRef);

        if (snapshot.exists()) {
            const eventData = snapshot.val() as EventF;
            const invitedUsers = eventData.invited || [];

            // Check if the user is already invited
            const userAlreadyInvited = invitedUsers.some(user => Object.values(user)[0] === userId);

            if (!userAlreadyInvited) {
                // Add the user to the invited list with status Waiting
                invitedUsers.push({
                    [EventStatus.APPROVED]: userId,
                });

                // Update the event data with the modified invited users list
                await set(eventRef, {
                    ...eventData,
                    invited: invitedUsers
                });
            } else {
                console.log("User already invited to the event.");
            }
        } else {
            console.log("Event not found.");
        }
    } catch (error) {
        console.error("Error adding invited user to event:", error);
        // Handle error
    }
}
export async function getInvitedUsersForEvent(eventId: string): Promise<Record<string, string>[]> {
    try {
        const db = getDatabase();
        const eventRef = ref(db, `events/${eventId}`);
        const snapshot = await get(eventRef);

        if (snapshot.exists()) {
            const eventData: EventF = snapshot.val();
            return eventData.invited ?? null; // Return invited users if they exist, or null otherwise
        } else {
            console.log("Event not found.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving invited users for event:", error);
        return null;
    }
}
