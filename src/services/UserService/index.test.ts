import UserService from "./index";

jest.setTimeout(150000);
describe("check user service class", () => {
  test("checking getting all users", async () => {
    const users = await UserService.getAllUsers();
    expect(typeof users).toEqual(typeof []);
  });
});
