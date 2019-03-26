if (navigator.serviceWorker){
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
            function (reg) {
                // console.log('SW registration success, scope :',reg.scope);
                return navigator.serviceWorker.ready;
            }).then(function(reg){
                document.getElementById('req-sync')
                .addEventListener('click', function(){
                    reg.sync.register('image-fetch').then(function(){
                        console.log('sync-registered');
                    }).catch(function(err){
                        console.log('unable to fetch image. Error : ', err);
                    });
                });
            }, function (err) {
                console.log('SW registration failed : ', err);
            });
    })
}