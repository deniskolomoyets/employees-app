import { ErrorWithMessage } from "../types";

export const isErrorWithMessage = (
  error: unknown
): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object"
  );
};

/* Added function isErrorWithMessage to check if the given argument is an object of type ErrorWithMessage.
 */
/* The isErrorWithMessage function takes an argument of type unknown and returns a boolean value. It checks if the argument is an object, not null, contains a data property, and if that property is an object.
 */
