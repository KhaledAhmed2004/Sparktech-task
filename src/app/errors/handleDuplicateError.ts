import httpStatus from "http-status";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = httpStatus.CONFLICT;

  // Extract the duplicated field name
  const fieldName = Object.keys(err.keyPattern || {})[0] || "unknown";

  // Extract the value that caused the duplication
  const duplicateValue = err.keyValue?.[fieldName] || "This value";

  const errorSources: TErrorSources = [
    {
      path: fieldName || "",
      message: `${duplicateValue} already exists`,
    },
  ];

  return {
    statusCode,
    message: "Duplicate Entry",
    errorSources,
  };
};

export default handleDuplicateError;
