import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
describe("./Header.js", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  });
  afterEach(() => {
    mockNavigate.mockClear();
  });
  afterAll(() => {
    mockNavigate.mockReset();
  });
  test("deveria renderizar o componente corretamente", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  test("deve disparar função de navegação ao clicar no logo", () => {
    const logo = screen.getByAltText("logo");
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).not.toHaveBeenCalledWith("/cart");
  });
});
