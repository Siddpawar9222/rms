
module.exports = Object.freeze({
    MODAL_TYPES : {
        SESSION_EXPIRED : "SESSION_EXPIRED",
        ERROR : "ERROR",
        CONFIRMATION : "CONFIRMATION",
        DEFAULT : "",
    },

    // RIGHT_DRAWER_TYPES : {
    //     NOTIFICATION : "NOTIFICATION",
    //     CALENDAR_EVENTS : "CALENDAR_EVENTS",
    // },

    // CONFIRMATION_MODAL_CLOSE_TYPES : {
    //     LEAD_DELETE : "LEAD_DELETE",
    // }, 

    JWT_ERRORS: Object.freeze(["Invalid JWT token", "Unsupported JWT token", "Expired JWT token"])
});

/*
The code you provided is using Object.freeze to create a constant configuration object in JavaScript. This object contains different types for modals and drawers used in your application, and it makes sure that these configurations are immutable, meaning they can't be changed after being defined.

Key Concepts:
Object.freeze:

This is a method that prevents modification to the object. Once an object is frozen, you can't add, delete, or change any properties.
This is useful in scenarios where you want to define a set of constants that should remain unchanged throughout the lifetime of the application, ensuring consistency.
Purpose:

This frozen object stores constant values representing different modal types and drawer types. These types are likely used across your application to control the behavior of modals (pop-ups) or drawers (sliding panels) in the UI.
By using constants, you avoid magic strings (hardcoding strings in different places), which improves maintainability and reduces errors.
*/