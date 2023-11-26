import "bootstrap/dist/css/bootstrap.min.css";
import MyCalendar from "./MyApp";

// Create the container

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyCalendar />);
