import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import ROUTES from "../../routes";

describe("Header", () => {
  it("renders logo correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });

  describe("renders profile and home links correctly", () => {
    it("they were rendered", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const profileLink = screen.getByText("Profile");
      const homeLink = screen.getByText("Home");
      expect(profileLink).toBeInTheDocument();
      expect(homeLink).toBeInTheDocument();
    });

    it("they have correct href attributes", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const profileLink = screen.getByText("Profile");
      const homeLink = screen.getByText("Home");
      expect(profileLink).toHaveAttribute("href", ROUTES.PROFILE);
      expect(homeLink).toHaveAttribute("href", ROUTES.HOME);
    });
  });

  describe("applies 'isActive' class to active link", () => {
    it("should make profile link isActive if we are on Profile page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.PROFILE]}>
          <Header />
        </MemoryRouter>
      );

      const profileLink = screen.getByText("Profile");
      const homeLink = screen.getByText("Home");

      expect(profileLink).toHaveClass("isActive");
      expect(homeLink).not.toHaveClass("isActive");
    });

    it("should make home link isActive if we are on Home page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Header />
        </MemoryRouter>
      );

      const profileLink = screen.getByText("Profile");
      const homeLink = screen.getByText("Home");

      expect(profileLink).not.toHaveClass("isActive");
      expect(homeLink).toHaveClass("isActive");
    });
  });
});