/* 5.13: Blog List Tests, step 1
Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

Add CSS classes to the component to help the testing as necessary. */

import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

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
