import { render } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";

describe("./Header.js", () => {
  test("deveria renderizar o componente corretamente", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId("header")).toBeInTheDocument();
  });
});
