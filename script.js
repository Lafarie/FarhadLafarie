const home = document.getElementById("home")
const project = document.getElementById("project")
const contact = document.getElementById("contact")
const about = document.getElementById("about")
var currentPage = 0
const text = document.getElementById("text");
const hover = document.getElementById("flip-card");


// Smooth scrolling function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const offset = 50; // Adjust this value to set the scroll offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
  
      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Attach click event listener to each navigation link
  const links = document.querySelectorAll('li a');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const href = link.getAttribute('href');
      smoothScroll(href);
    });
  });
  

  (function () {
    var words = [
      "Ui / UX Design",
      "Photographer",
      "Developer",
      "Youtuber",
      "Happy Person",
    ];
    var i = 0;
    var $wordsElement = $('#words'); // Cache the element to avoid querying it repeatedly

    setInterval(function () {
      $wordsElement.fadeOut(function () {
        var currentWord = words[i];
        var padding = " ".repeat(Math.max(14 - currentWord.length));
        // The Unicode Zero Width Space character (U+200B) is used for invisible padding

        $(this).html(currentWord + padding).fadeIn(); // Set the new text with invisible padding
      });
      i = (i + 1) % words.length; // Increment i after the fadeOut is complete
    }, 3500);
  })();


function hoverEf(num) {
  if (currentPage < num){
    hover.classList.add('hover-left')
    setTimeout (() => {
      check(num)
    }, 1000)
    setTimeout(() => {
      hover.classList.remove('hover-left')
      currentPage = num
    }, 3000)
  }else 
  {
    hover.classList.add('hover-right')
    setTimeout (() => {
      check(num)
    }, 1000)
    setTimeout(() => {
      hover.classList.remove('hover-right')
      currentPage = num
    }, 3000)
  }
  
}

const array = ['home-page','project-info','form','about-info']

function check(num){
  document.getElementById(array[currentPage]).classList.add('hidden')
  document.getElementById(array[num]).classList.remove('hidden')
  // setTimeout(() => {
  //   var tags = $(".tag");

  // for (var i = 0; i < tags.length; i++) {
  //   var tag = tags[i];

  //   if (tags.classList.contains('visible')) {
  //     $(tag).removeClass("visible");
      
  //   } else {
  //     $(tag).addClass("visible");
  //   }
  // }
  // },1000)
}


// $(document).on("scroll", function() {
//   var pageTop = $(document).scrollTop();
//   var pageBottom = pageTop + $(window).height();
//   var tags = $(".tag");

//   for (var i = 0; i < tags.length; i++) {
//     var tag = tags[i];

//     if ($(tag).position().top < pageBottom) {
//       $(tag).addClass("visible");
//     } else {
//       $(tag).removeClass("visible");
//     }
//   }
// });



function animateOnScroll() {
  setTimeout(() => {
  var tags = $(".tag");

  tags.each(function(index, tag) {
    setTimeout(function() {
      $(tag).addClass("visible");
    }, index * 300);
  });
},4000)
}

// Call the function when the button is clicked
$("#project").on("click", function() {
  animateOnScroll();
});
