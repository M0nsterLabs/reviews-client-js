<a name="Reviews"></a>

## Reviews
**Kind**: global class  

* [Reviews](#Reviews)
    * [new Reviews()](#new_Reviews_new)
    * [.getReviews(params)](#Reviews+getReviews) ⇒ <code>Object</code>
    * [.getReviewsClient(token, params)](#Reviews+getReviewsClient) ⇒ <code>Object</code>
    * [.approveReview(token, id)](#Reviews+approveReview) ⇒ <code>Object</code>
    * [.completeReview(token, id, params)](#Reviews+completeReview) ⇒ <code>Object</code>
    * [.declineReview(token, id)](#Reviews+declineReview) ⇒ <code>Object</code>
    * [.addReviewVote(token, id)](#Reviews+addReviewVote) ⇒ <code>Object</code>
    * [.replayTheReview(token, review_id)](#Reviews+replayTheReview) ⇒ <code>Object</code>
    * [.requestReviewComments(review_id)](#Reviews+requestReviewComments) ⇒ <code>Object</code>
    * [.voteComments(token, id, review_id)](#Reviews+voteComments) ⇒ <code>Object</code>

<a name="new_Reviews_new"></a>

### new Reviews()
Reviews API JS client.

In order to use Reviews API you should create an instance of this class.
~~~~
import Reviews from "tm-reviews-api-client-js";
const reviews = new Reviews ('http://api.templatemonster.com/reviews/v1', 'en');
const list = reviews.getReviews ([12345, 55555]);
~~~~

<a name="Reviews+getReviews"></a>

### reviews.getReviews(params) ⇒ <code>Object</code>
Return review information for given identifiers.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"currentPageIndex":1,
"totalCount":11,
"lastPageIndex":6,
"items": [
 {
   "id":23,
   "status":4,
   "user_id":21543,
   "user_name":"mice mice",
   "title":"review title",
   "content":"review content",
   "score":5,
   "template_id":58444,
   "vote_up":0,
   "vote_down":0,
   "_links":{"self":{"href":"http://service-reviews.dev/api/v1/reviews/23"}}
  }, ...]
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Reviews parameters |

<a name="Reviews+getReviewsClient"></a>

### reviews.getReviewsClient(token, params) ⇒ <code>Object</code>
Return review information for given identifiers. (client mode)

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"currentPageIndex":1,
"totalCount":11,
"lastPageIndex":6,
"items": [
 {
   "id":23,
   "status":4,
   "user_id":21543,
   "user_name":"mice mice",
   "title":"review title",
   "content":"review content",
   "score":5,
   "template_id":58444,
   "vote_up":0,
   "vote_down":0,
   "_links":{"self":{"href":"http://service-reviews.dev/api/v1/reviews/23"}}
  }, ...]
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| params | <code>Object</code> | Reviews parameters |

<a name="Reviews+approveReview"></a>

### reviews.approveReview(token, id) ⇒ <code>Object</code>
Return approve review information for given identifiers.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {
    "id": 1,
    "title": "Really good. Html is better than cms",
    "content": "I had font problem with flash cms. Now I have no problem with html",
    "score": 5,
    "created_at": 1469607948519,
    "user_id": 123,
    "template_id": 12345,
    "status": "initial",
    "vote_up": 1,
    "vote_down": 0,
    "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| id | <code>Number</code> | Review id |

<a name="Reviews+completeReview"></a>

### reviews.completeReview(token, id, params) ⇒ <code>Object</code>
Return complete review information for given identifiers.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {
    "id": 1,
    "title": "Really good. Html is better than cms",
    "content": "I had font problem with flash cms. Now I have no problem with html",
    "score": 5,
    "created_at": 1469607948519,
    "user_id": 123,
    "template_id": 12345,
    "status": "initial",
    "vote_up": 1,
    "vote_down": 0,
    "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| id | <code>Number</code> | Review id |
| params | <code>Object</code> | Reviews parameters |

<a name="Reviews+declineReview"></a>

### reviews.declineReview(token, id) ⇒ <code>Object</code>
Return decline review information for given identifiers.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {
    "id": 1,
    "title": "Really good. Html is better than cms",
    "content": "I had font problem with flash cms. Now I have no problem with html",
    "score": 5,
    "created_at": 1469607948519,
    "user_id": 123,
    "template_id": 12345,
    "status": "initial",
    "vote_up": 1,
    "vote_down": 0,
    "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| id | <code>Number</code> | Review id |

<a name="Reviews+addReviewVote"></a>

### reviews.addReviewVote(token, id) ⇒ <code>Object</code>
Return added votes for the review: increment vote_up or vote_down field.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {
    "id": 1,
    "title": "Really good. Html is better than cms",
    "content": "I had font problem with flash cms. Now I have no problem with html",
    "score": 5,
    "created_at": 1469607948519,
    "user_id": 123,
    "template_id": 12345,
    "status": "initial",
    "vote_up": 1,
    "vote_down": 0,
    "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| id | <code>Number</code> | Review id |

<a name="Reviews+replayTheReview"></a>

### reviews.replayTheReview(token, review_id) ⇒ <code>Object</code>
Return reply of the review information for given identifiers.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {
  "id": 1,
  "review_id": 1,
  "content": "I had font problem with flash cms. Now I have no problem with html",
  "created_at": 1469607948519,
  "user_id": 123,
  "vote_up": 0,
  "vote_down": 0,
  "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1/comment/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| review_id | <code>Number</code> | ID of the parent review |

<a name="Reviews+requestReviewComments"></a>

### reviews.requestReviewComments(review_id) ⇒ <code>Object</code>
Return request review comments list.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {
  "id": 1,
  "review_id": 1,
  "content": "I had font problem with flash cms. Now I have no problem with html",
  "created_at": 1469607948519,
  "user_id": 123,
  "vote_up": 0,
  "vote_down": 0,
  "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1/comment/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| review_id | <code>Number</code> | ID of the parent review |

<a name="Reviews+voteComments"></a>

### reviews.voteComments(token, id, review_id) ⇒ <code>Object</code>
Return votes of the review.

**Kind**: instance method of <code>[Reviews](#Reviews)</code>  
**Returns**: <code>Object</code> - <pre>{
"canModerate": 1,
"item":
 {

  "id": 1,
  "review_id": 1,
  "content": "I had font problem with flash cms. Now I have no problem with html",
  "created_at": 1469607948519,
  "user_id": 123,
  "vote_up": 0,
  "vote_down": 0,
  "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1/comment/1"}}
  }
 }</pre>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token |
| id | <code>Number</code> | ID of the comment |
| review_id | <code>Number</code> | ID of the parent review |

