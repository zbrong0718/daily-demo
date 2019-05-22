var keyMap = {};
(function () {
  var code, codeName, codeNames, i;
  // 0 - 9
  for( code = 48; code <= 57; code++ ) {
    codeName = String.fromCharCode( code );
    keyMap[ codeName ] = code;
  }
  // A - Z
  for( code = 65; code <= 90; code++ ) {
    codeName = String.fromCharCode( code );
    keyMap[ codeName ] = code;
  }
  // Windows: winkey
  // MacOS: Command
  keyMap[ 'Meta' ] = 91;
  // Num 0 - 9
  for( code = 96; code <= 105; code++ ) {
    codeName = 'Num' + ( code - 96 );
    keyMap[ codeName ] = code;
  }
  // F1 - F 12
  for( code = 112; code <= 123; code++ ) {
    codeName = 'F' + ( code - 111 );
    keyMap[ codeName ] = code;
  } 
  codeNames = '*|+|Enter|-|.|/'.split('|');
  for( i = 0; i < codeNames.length; i++ ) {
    code = i + 106;
    codeName = codeNames[ i ];
    keyMap[ codeName ] = code;
  }

  keyMap[ 'Esc' ] = 27;

  codeNames = 'Space|PageUp|PageDown|End|Home|ArrowLeft|ArrowUp|ArrowRight|ArrowDown'.split('|');
  for( i = 0; i < codeNames.length; i++ ) {
    code = i + 32;
    codeName = codeNames[ i ];
    keyMap[ codeName ] = code;
  }

  keyMap[ 'Insert' ] = 45;
  keyMap[ 'Delete' ] = 46;
  keyMap[ 'NumLock' ] = 144;
  keyMap[ 'ScrollLock' ] = 145;

  codeNames = ';:|=+|,<|-_|.>|/?|`~'.split('|');
  for( i = 0; i < codeNames.length; i++ ) {
    code = i + 186;
    codeName = codeNames[ i ];
    keyMap[ codeName ] = code;
  }

  codeNames = '[{,|,]},\'"'.split(',');
  for( i = 0; i < codeNames.length; i++ ) {
    code = i + 219;
    codeName = codeNames[ i ];
    keyMap[ codeName ] = code;
  }

  codeNames = 'Backspace|Tab|Clear|Enter|Shift|Control|Alt|CapsLock'.split('|');
  for( i = 0; i < codeNames.length; i++ ) {
    code = i + 8;
    codeName = codeNames[ i ];
    keyMap[ codeName ] = code;
  }

keyMap[ 'AudioVolumeDown' ] = 174;
keyMap[ 'AudioVolumeUp' ] = 175;
keyMap[ 'Stop' ] = 179;
keyMap[ 'Browser' ] = 172;
keyMap[ 'Mute' ] = 173;
keyMap[ 'Pause' ] = 19;
keyMap[ 'Email' ] = 180;
keyMap[ 'Search' ] = 170;
keyMap[ 'AddFavorite' ] = 171;

})();