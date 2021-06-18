import { render, screen } from "@testing-library/react";
import UserInfoComponent from "./UserInfoComponent";

beforeEach(() => {
  render(<UserInfoComponent />);
});

test("is user name coming", () => {
  const nameEl = screen.getByTestId("name");
  expect(nameEl.textContent).toBe("...");
});

test('Logout image must have src = "/navImage/cikis512x512.png" and alt = "Çıkış Yap"', () => {
  const logout = screen.getByRole("img");
  expect(logout).toHaveAttribute("src", "/navImage/cikis512x512.png");
  expect(logout).toHaveAttribute("alt", "Çıkış Yap");
});
