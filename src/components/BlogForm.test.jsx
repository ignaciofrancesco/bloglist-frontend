import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

/* 
5.16: Blog List Tests, step 4
Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.
 */

test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  // ARRANGE

  // Mock handler
  const mockHandler = vi.fn();

  // Render component
  const { container } = render(<BlogForm createBlog={mockHandler} />);

  // ACT

  // Create a user session
  const browserUser = userEvent.setup();

  // Fill out the form
  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");

  await browserUser.type(title, "Title test");
  await browserUser.type(author, "Author test");
  await browserUser.type(url, "www.test.com");

  // Submit the form
  const createButton = screen.getByTestId("create-button");
  await browserUser.click(createButton);

  // ASSERT

  // Handler called once
  expect(mockHandler.mock.calls).toHaveLength(1);

  // The handler is called with the rigth details
  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: "Title test",
    author: "Author test",
    url: "www.test.com",
  });
});
