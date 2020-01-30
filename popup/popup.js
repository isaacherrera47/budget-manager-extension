$(function () {

    chrome.storage.sync.get(['total', 'limit'], (budget) => {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], (budget) => {
            let newTotal = 0;
            const amountField = $('#amount');
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            const amount = amountField.val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, () => {
                if (amount && newTotal >= budget.limit) {
                    const notificationOptions = {
                        type: 'basic',
                        iconUrl: '../images/budget48.png',
                        title: 'Limit reached',
                        message: 'Uh oh! Looks like you have reached your limit'
                    };
                    chrome.notifications.create('limitNot', notificationOptions);
                }
            });

            $('#total').text(newTotal);
            amountField.val('');

        });
    });
});