import AuthChecker from "../../../middleware/auth";
import { Role } from "../../../types";

describe("check account information", () => {
  test("check authorization", () => {
    const checker = AuthChecker.checkAuthorization;
    const isAuthorized = checker(
      Role.END_USER,
      Object.values(Role)
        .map((val) => val.toString())
        .filter((val) => val !== Role[Role.END_USER])
    );
    expect(isAuthorized).not.toBeTruthy();
  });
});
