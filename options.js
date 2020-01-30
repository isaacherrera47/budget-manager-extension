$(function () {

    chrome.storage.sync.get('limit', (budget) => {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(() => {
        const limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({limit}, () => close());
        }
    });

    $('#resetTotal').click(() => {
        chrome.storage.sync.set({total: 0});
    });
});