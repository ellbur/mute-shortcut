
$(document).ready(function() {
  var coid = $("#coid_website_searchResults");

  function addButtonsToChildren(parent) {
    var results = $(parent).find(".co_searchResults_citation");
    results.each(function(i, citation) {
      var volJournalPageElem = $(citation).find(".co_search_detailLevel_2");
      var volJournalPageText = $(volJournalPageElem).text();
      var copyButton = $('<button class="quick-copy-button">Copy</button>');
      $(copyButton).click(function() {
        // https://stackoverflow.com/a/14816523/371739
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(volJournalPageElem[0]);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        copyButton.addClass('done');
      });
      volJournalPageElem.after(copyButton);
    });
  };

  // https://stackoverflow.com/a/12597182/371739
  function mutationHandler(mutationRecords) {
    mutationRecords.forEach(function(mutation) {
      if (typeof mutation.addedNodes == "object") {
        mutation.addedNodes.forEach(function(node) {
          addButtonsToChildren(node);
        });
      }
    });
  };
  var myObserver = new MutationObserver(mutationHandler);
  var obsConfig = { childList: true, characterData: false, attributes: false, subtree: false };

  myObserver.observe(coid[0], obsConfig);

  addButtonsToChildren(coid);
});
