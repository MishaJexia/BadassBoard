const autocomplete = (search) => {
  let matches = suggestions.filter(suggestion => {
    const regex = new RegExp(`^${search}`, 'gi');
    return suggestion.label.match(regex);
  });

  // Prevent suggestions if the input is empty
  if (!search.length) {
    matches = [];
    $('.suggestions').text('');
    $('.formContainer')
      .css({
        borderRadius: '2em',
        padding: '0.5% 1%'
      });

    $('.suggestions').removeClass('active');
  }

  if (matches !== [] && search.length >= 2 && search.startsWith('!')) {
    $('.formContainer')
      .css({
        borderRadius: '2em 2em 0 0',
        paddingBottom: 0
      });

    if (!$('.suggestions').hasClass('active')) {
      $('.suggestions').addClass('active');
    }

    $('.suggestions')
      .css({
        width: $('.formContainer').innerWidth()
      });

    // Check if matches are not null
    if (matches !== [] && matches.length > 0) {
      const html = matches.map(match => `
            <div class="suggestion flex">
              <img class="suggestion__icon" src="${match.icon}" alt="${match.desc} icon" height="20px" />
              <span class="suggestion__label">${match.label}</span>
              <span class="suggestion__desc">${match.desc}</span>
            </div>
            `)
        .join('');

      $('.suggestions').html(html);
      $('.suggestion').click((event) => {
        let nodevalue;
        let target = event.target;
        if (target.className === 'suggestion__label') {
          nodevalue = target.textContent;
        } else if (target.className === 'suggestion__icon') {
          nodevalue = target.nextElementSibling.textContent;
        } else if (target.className === 'suggestion__desc') {
          nodevalue = target.previousElementSibling.textContent;
        } else if (target.className === 'suggestion') {
          nodevalue = target.children[1].textContent;
        }

        if (nodevalue) {
          $('.questionBox')
            .val(`${nodevalue} `)
            .focus();
        }
      });
    } else {
      $('.suggestions').removeClass('active');
    }
  }
}
