/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready. 
*/
$(function() {
    /* This test suite is about the RSS
    * feeds definitions and contains a related set of tests. 
    */
    describe('RSS Feeds', function() {
        /* This test make sure that the
         * allFeeds variable has been defined and that it is not empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object and 
        * ensures it has a URL defined and that the URL is not empty.
        */
        it('loops through each feed and ensures it has a URL defined and not empty', function() {
            for(var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].url).toBeDefined();
                expect(allFeeds[x].url.length).not.toEqual(0);
            }
        });
       

        /* This test loops through each feed in the allFeeds object and ensures
        * it has a name defined and that the name is not empty.
        */
        it('loops through each feed and ensures it has a name defined and not empty', function() {
            for(var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name.length).not.toEqual(0);
            }
        });
    });


    /* This test suite is about the menu element*/
    var menu = document.querySelector('a.menu-icon-link');
    describe('The menu', function() {

        /* This test ensures the menu element is hidden by default.*/
        it('ensures the menu element is hidden by default', function() {
            expect(document.body).toHaveClass('menu-hidden');
        });

        /* This test ensures the menu changes visibility when the menu icon is clicked.*/
        it('ensures the menu changes visibility when the menu icon is clicked', function() {
            menu.click();
            /*test expects that the menu display when clicked and hide when clicked again.*/
            expect(document.body).not.toHaveClass('menu-hidden');
            menu.click();
            expect(document.body).toHaveClass('menu-hidden');
        });
    });

    /* This test suite is about Initial Entries */
    var feedContainer = document.querySelector("div.feed");
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed function is called and completes its work,
        * there is at least a single entry element within the feed container.*/
        beforeEach(function(done) {
            loadFeed(1, done) 
        });
          
        it('ensures there is at least a single entry element within the feed container', function() {
            expect(feedContainer.childNodes.length).toBeGreaterThan(0);
        });
    });

    /* This test suite is about the content of the New Feed*/
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded by the loadFeed function
         that the content changes.*/
        var currentFeeds;
        beforeEach(function(done) {
            loadFeed(1, function () { 
                var currentFeeds = document.querySelector("div.feed").innerHTML;
                loadFeed(2, function () {
                    done();

                });
            });
        });

        it('content changes when a new feed is loaded', function() {
            var newFeeds = document.querySelector("div.feed").innerHTML;
            expect(newFeeds).not.toEqual(currentFeeds);
        });
    });
   
}());
