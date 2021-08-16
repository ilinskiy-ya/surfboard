//отзывы
const findBlockByAlias = (alias) => {
   return $(".reviews__item").filter((ndx, item)=>{
       return $(item).attr("data-linked-with") === alias
    } );
};

$('.interactive-avatar__link').click(e =>{
    e.preventDefault();

    const $this =$(e.currentTarget);
    const target= $this.attr ("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem =$this.closest('.reviews__switcher-item');

    itemToShow.addClass('active').siblings().removeClass("active");
    curItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');

});

//interactive-avatar__link

//команада
const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();

    container.addClass("active")
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__content');
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0); 
}

$(".team__title").click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");
 
    if(elemContainer.hasClass("active")) {
    closeEveryItem(container);
    } else {
    closeEveryItem(container);
    openItem($this);
    }

    
});

//слайдер

const slider= $('.products').bxSlider({
    pager: false,
    controls: false
});

$(".arrow__left").click(e =>{
    e.preventDefault();

    slider.goToPrevSlide();
})

$(".arrow__right").click(e =>{
    e.preventDefault();

    slider.goToNextSlide();
})


//заказы popup

$(".form").submit (e =>{
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find('[name="name"]');
    const phone = form.find('[name="phone"]');
    const street = form.find('[name="street"]');
    const house = form.find('[name="house"]');
    const flat = form.find('[name="flat"]');
    const to = form.find('[name="to"]');

    [name, phone, street, house, flat, to].forEach((filed) =>{
        filed.removeClass("input-error");
        if(filed.val().trim() ==""){
            filed.addClass("input-error");
        }
    });

    const errorFields = form.find("input-error");

    if (errorFields.lenght == 0) {
        $.ajax({
            URL: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                street: street.val(),
                house: house.val(),
                flat: flat.val(),
                to: to.val(),
            },
        });
    }

    

    $.fancybox.open({
        src: "#popup",
        type: "inline"
    })
    
});

$(".js-button").click(e =>{
    e.preventDefault();

    $.fancybox.close();
});

//карта

/*ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
}*/

let myMaps;

const init = () => {
    myMaps = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
}

ymaps.ready(init);