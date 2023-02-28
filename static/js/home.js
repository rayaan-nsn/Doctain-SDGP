$(document).ready(function() {
    $('#searchTerm').on('keyup', function() {
      var input = $(this).val().toLowerCase();

      var suggestions = ['Chest pain', 'shortness of breath', 'fatigue', 'dizziness', 'sweating', 'nausea', 'vomiting', 'lightheadedness',
        'weakness', 'irregular heartbeat', 'headaches', 'blurred vision', 'nosebleeds', 'palpitations', 'feeling of fullness or pressure in chest',
        'leg pain', 'numbness', 'tingling', 'coldness', 'slow healing of wounds', 'swelling in legs and ankles', 'swelling', 'persistent cough',
        'rapid or irregular heartbeat', 'cough', 'fainting', 'fever', 'night sweats', 'weight loss', 'weight gain', 'blood-tinged sputum', 'seizures',
        'sudden loss of consciousness', 'no pulse', 'no breathing', 'swollen ankles and legs', 'extreme thirst', 'frequent urination', 'sudden weight loss',
        'increased hunger', 'dry mouth', 'slow-healing wounds', 'high blood pressure', 'swollen feet and ankles', 'fruity-smelling breath', 'rapid breathing',
        'confusion', 'abdominal pain', 'high fever', 'vision changes', 'dry skin', 'shaking', 'anxiety', 'irritability', 'High blood sugar levels in the morning',
        'floaters', 'blind spots', 'difficulty seeing at night', 'vision loss', 'burning in the hands and feet', 'sharp pains', 'sensitivity to touch', 'loss of coordination',
        'Sores, cuts or blisters that don\'t heal', 'redness', 'thickening of the skin', 'poor circulation', 'dry, itchy skin', 'skin infections', 'patches of dark skin',
        'bleeding gums', 'red or swollen gums', 'bad breath', 'receding gums', 'loose teeth', 'labored breathing', 'acetone breath', 'bloating', 'heartburn', 'reduced sexual desire',
        'reduced sensation in the penis', 'pain', 'chills', 'chest discomfort', 'reduced tolerance for exercise', 'fingernail clubbing', 'swollen lymph nodes', 'skin rash', 'joint pain',
        'coughing up blood', 'pleural effusion', 'pneumonia', 'pulmonary embolism', 'breast lump', 'changes in breast shape or size', 'nipple discharge', 'changes in the skin of the breast',
        'swollen lymph nodes','breast pain', 'difficulty starting or stopping urination', 'weak or interrupted flow of urine', 'blood in urine or semen', 'increased urination', 'pain in the hips',
        'pelvis', 'or lower back', 'changes in bowel habits', 'rectal bleeding or blood in stool', 'abdominal pain or cramps', 'changes in skin color or texture', 'changes in the size',
        'shape or color of a mole', 'a sore that does not heal', 'a spot or lump that bleeds or crusts over', 'abdominal bloating or swelling', 'pelvic pain', 'difficulty eating or feeling full quickly',
        'loss of appetite', 'increased appetite', 'jaundice', 'dark urine', 'foamy or bloody urine', 'light-colored stools', 'frequent infections', 'easy bleeding or bruising', 'itching', 'headaches',
        'seizures', 'difficulty thinking'
];
      var filteredSuggestions = suggestions.filter(function(suggestion) {
        return suggestion.toLowerCase().includes(input);
      });
      var suggestionsHtml = '';
      if (input.length > 0) {
        for (var i = 0; i < filteredSuggestions.length; i++) {
          var suggestion = filteredSuggestions[i];
          var highlightIndex = suggestion.toLowerCase().indexOf(input);
          var highlightedSuggestion = suggestion.slice(0, highlightIndex) + '<span class="highlight">' + suggestion.slice(highlightIndex, highlightIndex + input.length) + '</span>' + suggestion.slice(highlightIndex + input.length);
          suggestionsHtml += '<div class="suggestion">' + highlightedSuggestion + '</div>';
        }
      }
      $('#suggestionsList').html(suggestionsHtml);
    });
  
    $(document).on('click', '.suggestion', function() {
      var tag = $(this).text();
      if ($('#tagList').find('.tag:contains(' + tag + ')').length == 0) {
        $('#tagList').append('<div class="tag">' + tag + '&nbsp;&nbsp;<i class="fa-solid fa-xmark close"></i></div>');

      }
      $('#searchTerm').val('');
      $('#suggestionsList').empty();
    });
  
    $(document).on('click', '.tag .close', function() {
      $(this).parent().remove();
    });
  
    $('#searchTerm').on('keydown', function(e) {
      if (e.which === 13) {
        var tag = $(this).val();
        if ($('#tagList').find('.tag:contains(' + tag + ')').length == 0) {
            $('#tagList').append('<div class="tag">' + tag + '&nbsp;&nbsp;<i class="fa-solid fa-xmark close"></i></div>');
        }
        $(this).val('');
        $('#suggestionsList').empty();
      }
    });
});



  