import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

/* 5.13: Blog List Tests, step 1
Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

Add CSS classes to the component to help the testing as necessary. */

test("renders content", () => {
  const user = {
    name: "ignacio",
  };
  const blog = {
    title: "Blog title",
    author: "John Wick",
    url: "www.yo.com",
    likes: 7,
    user,
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const title = screen.getByText("Blog title", { exact: false });
  const author = screen.getByText("John Wick", { exact: false });
  const url = screen.queryByText("www.yo.com"); // doesnt throw an exception if not found
  const likes = container.querySelector("[data-testid='likes']");

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

/*
5.14: Blog List Tests, step 2
Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
*/
test("the blog s URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  // ARRANGE
  const user = {
    name: "ignacio",
  };
  const blog = {
    title: "Blog title",
    author: "John Wick",
    url: "www.yo.com",
    likes: 7,
    user,
  };

  // Render component
  const { container } = render(<Blog blog={blog} user={user} />);

  // Mock click on button
  const browserUser = userEvent.setup();
  const button = screen.getByTestId("show-hide-button");

  // ACT
  await browserUser.click(button);

  // ASSERT

  // Number of likes are shown
  const likes = container.querySelector("[data-testid='likes']");
  expect(likes).toBeDefined();

  // Blog s url is shown
  const url = screen.getByText("www.yo.com", { exact: false });
  expect(url).toBeDefined();
});

/* 
5.15: Blog List Tests, step 3
Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
 */

test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  // ARRANGE
  const user = {
    name: "ignacio",
  };
  const blog = {
    title: "Blog title",
    author: "John Wick",
    url: "www.yo.com",
    likes: 7,
    user,
  };

  // Mock the handler function
  const mockHandler = vi.fn();

  // Render component
  const { container } = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  );

  // ACT

  // Create a user session
  const browserUser = userEvent.setup();

  const showButton = screen.getByTestId("show-hide-button");
  await browserUser.click(showButton);

  const likeButton = screen.getByTestId("like-button");
  await browserUser.click(likeButton);
  await browserUser.click(likeButton);

  // ASSERT

  expect(mockHandler.mock.calls).toHaveLength(2);
});
