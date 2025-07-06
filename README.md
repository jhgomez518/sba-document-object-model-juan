
Apparently no "Reflection Questions" requirement on this assignment, mostly used README for a few broad takeaways, key insights,
and notable sources used during assignment completion. This may change, but as of now I did not add any functionality to
my "edit" button--it is the one thing (to my knoweledge) which I did not complete from the requirements.

- need to develop a better intuition for when to use class and when to use id
- realized I could remove the id attribute
- source for timestamp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
- source for querySelectorAll (ended up using different strategy): https://www.w3schools.com/jsref/met_document_queryselectorall.asp
- thing I got stuck on most: kept forgetting to update the recovery function with any new functionality I added to the eventlistener on
  "post" element; in particular, when I added the delete and edit buttons to the cloned template (created upon posting a ramble),
  I got stumped because I forgot to add this same functionality (the handler for the delete button specifically) to the recovery function.