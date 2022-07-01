function getWord() {
  var word = document.getElementById('word').value;
  var urlname = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
  data = fetchUrl(urlname);
  async function fetchUrl(urlname) {
    try {
      const word_info = [];
      const response = await fetch(urlname);
      var data = await response.json();
      data = data[0];
      // console.log(data);
      word_info.push({'word': data['word']});
      // console.log('phonetics');
      // console.log(data['phonetics'][0]['audio']);
      try {
      var audio = data['phonetics'][0]['audio'];
      change_phonetics(audio);
      }
      catch(err) {
        console.log('no audio', err);
      }

      function change_phonetics(music) {
        document.getElementById('myAudio').pause();
        document.getElementById('myAudio').setAttribute('src', music);
        document.getElementById('myAudio').load();
        document.getElementById('myAudio').play();
        return
      }

      array_length = data['meanings'].length;
      for(let i = 0; i < array_length; i++) {
        // word_info.push({'part of speech': data['meanings'][i]['partOfSpeech']});
        // console.log(data['meanings'][i]['definitions']);
        length_definition = data['meanings'][i]['definitions'].length;
        defExample = [];
        // examples = [];
        for(let n = 0; n < length_definition; n++) {
          // console.log(data['meanings'][i]['definitions'][n]['definition']);
          // console.log(data['meanings'][i]['definitions'][n]['example']);
          defExample.push(data['meanings'][i]['definitions'][n]['definition']);
          if(data['meanings'][i]['definitions'][n]['example'] === 'undefined') {
            defExample.push(" ");
          }
          else {
          defExample.push(data['meanings'][i]['definitions'][n]['example']);
        }
      }
      // console.log(data['meanings'][i]['partOfSpeech']);
      // console.log(typeof data['meanings'][i]['partOfSpeech']);

      word_info.push({key: data['meanings'][i]['partOfSpeech'], value:defExample});
      // console.log(word_info);

    }
    postData(word_info);
  }
  catch(err) {
    console.log('error, cannot connect', err);
  }
  }
}


function postData(word_info) {

  if( word != '') {

    length_file = word_info.length;
    postWord = ' ' + word_info[0]['word'];
    document.getElementById('searchedWord').innerText = postWord;
    let child = document.getElementById('child');
    let parent = document.getElementById('new');
    parent.removeChild(child);
    var section = document.createElement('section');
    section.id = 'child';
    var element = document.getElementById('new');
    element.appendChild(section);
    var tag = document.createElement('hr');
    var element = document.getElementById('child');
    element.appendChild(tag);

    for(let i = 1; i < length_file; i++) {
      console.log('i', i);
      console.log(word_info[i]['key']);
      useOfWord = word_info[i]['key'];
      create_line(useOfWord, 0);
      def_length = word_info[i]['value'].length;
      for(let n = 0; n < def_length; n++) {
        defOfWord = word_info[i]['value'][n];
        if(n % 2 == 0) {
          defOfWord = ('def.: ' + defOfWord);
          create_line(defOfWord, 1);
        }
        else {
            if(defOfWord === undefined) {
              defOfWord = 'ex. :  na ';
            }
            else {
              defOfWord = 'ex.: ' + defOfWord;
              if(n == length_file-1) {
                defOfWord = defOfWord + '\n';
              }
            } create_line(defOfWord, 2);
          }
        }  
      }  
    }
    box = document.getElementById('collapse');
    box.classList.remove('hide');
    document.getElementById('thankyou').classList.add('hide');
    document.getElementById('topfill').classList.add('hide');
    document.getElementById('reminder').classList.remove('hide');
  }



function create_line(passedWord, num) {
  if(num != 0) {
    var tag = document.createElement('p');
  } else {
    var tag = document.createElement('h3');
  }
  var text = passedWord;
  var text1 = document.createTextNode(text);
  tag.appendChild(text1);
  var element = document.getElementById('child');
  element.appendChild(tag);
  if(num === 2 || num === 0) {
    var tag = document.createElement('hr');
    var element = document.getElementById('child');
    element.appendChild(tag);
  }
  return
}

function refresh() {
  word = document.getElementById('word');
  word.value = '';
  document.getElementById('collapse').classList.add('hide');
  document.getElementById('reminder').classList.add('hide');

  }

function thankYou() {
  box = document.getElementById('container');
  box.classList.add('hide');
  document.getElementById('thankyou').classList.remove('hide');
  document.getElementById('topfill').classList.remove('hide');
}
