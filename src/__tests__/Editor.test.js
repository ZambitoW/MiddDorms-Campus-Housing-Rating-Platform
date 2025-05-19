import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "@/components/Editor";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  }),
}));

const initialReview = {
  id: 1,
  userId: 1,
  buildingId: "gifford",
  room_type: "single",
  storage_space: 1,
  clean: 1,
  size: 1,
  noise: 1,
  dining_hall_proximity: 1,
  ac_proximity: 1,
  public_bathrooms: 1,
  public_kitchens: 1,
  laundry: 1,
  comment:
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
};

beforeEach(() => {
  global.fetch = jest.fn((_, options = {}) => {
    if (options.method === "PUT") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    }

    //On a GET fetch call, mock the initial review
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(initialReview),
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Editor", () => {
  test("Loads in initial header", async () => {
    render(<Editor id={1} />);
    expect(
      await screen.findByText(/Rate Your Gifford Experience/i),
    ).toBeInTheDocument();
  });
  test("The initial review is loaded in accurately", async () => {
    render(<Editor id={1} />);

    const submitButton = await screen.findByText(/submit/i);
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    //Assert that if nothing is changed, then the review is the same as the inital review upon submitting
    const putCall = global.fetch.mock.calls.find(
      (call) => call[1]?.method === "PUT",
    );

    const body = JSON.parse(putCall[1].body);
    expect(body).toMatchObject(initialReview);
  });

  test("Review can be updated", async () => {
    render(<Editor id={1} />);

    const submitButton = await screen.findByText(/submit/i);
    expect(submitButton).not.toBeDisabled();

    const sliders = screen.getAllByRole("slider");
    for (const slider of sliders) {
      fireEvent.keyDown(slider, { key: "ArrowRight", code: "ArrowRight" });
    }

    fireEvent.click(submitButton);

    const putCall = global.fetch.mock.calls.find(
      (call) => call[1]?.method === "PUT",
    );
    const body = JSON.parse(putCall[1].body);

    //The sliders were moved one tick to the right so each category should increase by one
    const updatedReview = {
      id: 1,
      userId: 1,
      buildingId: "gifford",
      room_type: "single",
      storage_space: 2,
      clean: 2,
      size: 2,
      noise: 2,
      dining_hall_proximity: 2,
      ac_proximity: 2,
      public_bathrooms: 2,
      public_kitchens: 2,
      laundry: 2,
      comment:
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    };
    expect(body).toMatchObject(updatedReview);
  });
  test("The initial comment is shown on the screen", async () => {
    render(<Editor id={1} />);
    //For some reason I have to await for the submit button otherwise the test fails before the page renders
    await screen.findByText(/submit/i);
    const commentBox = screen.getByPlaceholderText(/type your comment here/i);
    expect(commentBox).toHaveValue(initialReview.comment);
  });
});
