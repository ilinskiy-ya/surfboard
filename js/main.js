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
    const modal = $(".order__background");
$(".form").submit (e =>{
    e.preventDefault();

    
    const form = $(e.currentTarget);
    const name = form.find('[name="name"]');
    const phone = form.find('[name="phone"]');
    const street = form.find('[name="street"]');
    const house = form.find('[name="house"]');
    const flat = form.find('[name="flat"]');
  //  const to = form.find('[name="to"]');

    [name, phone, street, house, flat].forEach((filed) =>{
        filed.removeClass("input-error");
        if(filed.val().trim() ==""){
            filed.addClass("input-error");
        }
    });

    const errorFields = form.find("input-error");
    console.log(errorFields);

    if (errorFields.length == 0) {
        $.ajax({
            URL: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: street.val(),
                house: house.val(),
                flat: flat.val(),
                to: "test@test.ru"
            },
            success: data => {
          //      modalText.text(data.message)
                  modal.addClass("order__background_active");
              },
              error: data =>{
           //     console.log(data);
            //    const ErrMessage = data.responseJSON.message;
              //  modalText.text(ErrMessage);
              //  $(modalText).css("color", "red");
                modal.addClass("order__background_active");
              }
            
        });
    }

    

    /*$.fancybox.open({
        src: "#popup",
        type: "inline"
    })*/
    
});

$(".button__close").click(e =>{
    e.preventDefault();

    modal.removeClass("order__background_active");
});

//карта

/*ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
}*/

let myMap;

const init = () => {
    myMap = new ymaps.Map("map",{
        center: [54.73, 20.51],
        zoom: 16
    });
}

ymaps.ready(init);

//OPC

const sections = $('section');
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active");



const performTransition = sectionEq => {
    if(inScroll == false) {
        inScroll = true;
        const position = sectionEq * -100;

        const currentSection = sections.eq(sectionEq);
            const menuTheme = currentSection.attr("data-sidemenu-theme");
            const sideMenu = $(".fixed-menu")
            if (menuTheme == "black") {
                sideMenu.addClass("fixed-menu--shadowed");
            } else {
                sideMenu.removeClass("fixed-menu--shadowed");
            }

        display.css ({
            transform: `translateY(${position}%)`
        });
    
        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

        sideMenu
        .find (".fixed-menu__item")
        .eq(sectionEq)
        .addClass("fixed-menu__item--active")
        .siblings()
        .removeClass("fixed-menu__item--active");

        setTimeout(()=>{
            inScroll = false;                
        

        }, 1300);
    }   
};

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction == "next" && nextSection.length) {
        performTransition(nextSection.index())
    }

    if (direction == "prev" && nextSection.length) {
        performTransition(prevSection.index())
    }
}

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        //performTransition(2);
        scrollViewport("next");
    }

    if (deltaY < 0) {
        scrollViewport("prev");
    }
    //console.log(deltaY);
});

$(window).on("keydown", (e) => {

    const tagName = e.target.tagName.toLowerCase();

    if (tagName != "input" && tagName !=  "textarea") {
        switch (e.keyCode) {
            case 38:
            scrollViewport ("prev");
            break;
    
            case 40:
                scrollViewport ("next");
                break;
        }
    }    
});

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition (reqSection.index());
})
