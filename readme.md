<!-- Ans to the Question Number 1 -->

getElementById('id') :- Returns a specific element with the given ID;
getElementsByClassName(className) - Returns all elements with the same class name;
querySelector(selector) - Used to select CSS elements (.class, #id, tag[p, h1], div);
querySelectorAll(selector) - Returns all matching elements;

<!-- Ans to the Question Number 2 -->

To add a new element to the DOM:
1st. Create a new element.
2nd. Add some new content inside it.
3rd. Then use appendChild() to add it to the body or any element.

<!-- Ans to the Question Number 3 -->

Event Bubbling is a process where an event first triggers on the target element and then goes up through its parent, then its parent's parent, and so on, up to the root of the DOM.

<!-- Ans to the Question Number 4 -->

Event Delegation means placing an event listener on a parent element and checking through that event which child element actually triggered the event.
..It is used for handling many children or for dynamic elements.

<!-- Ans to the Question Number 5 -->

The difference between preventDefault() and stopPropagation() is:

.preventDefault() - Stops the default action of an event.
.stopPropagation() - Stops the bubbling of the event.
