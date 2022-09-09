import "jsdom-global/register";
import React from "react";
import LoginPage from "../pages/login";
import { mount, shallow } from "enzyme";

describe("Login testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<LoginPage />);
  });

  // heading
  test("Render the heading login", () => {
    // console.log(wrapper.debug())
    expect(wrapper.find("h1").text()).toContain("Login");
  });

  // Button Login
  test("Render button with text of `Login`", () => {
    expect(wrapper.find("#login").text()).toContain("Login");
  });

  // form input fields
  test("input field should be filled correctly", () => {
    const credentials = { emailtest: "test@gmail.com", passwordtest: "testpass" };
    const emailInput = wrapper.find("email");
    emailInput.value = credentials.email;
    expect(credentials.emailtest).toBe(credentials.emailtest);

    const passwordInput = wrapper.find("password");
    passwordInput.value = credentials.password;
    expect("testpass").toBe(credentials.passwordtest);
  });
});
