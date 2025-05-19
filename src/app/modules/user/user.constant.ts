export const USER_ROLE = {
  student: "student",
  teacher: "teacher",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
