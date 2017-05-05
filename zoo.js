var _ = require('underscore')._;

class Animal {
  speak(sentence) {
    var output = [];
    _.each(sentence.split(' '), function(element, index, value) {
      output.push(element);
      output.push(this.sound);
    }, { sound: this.sound(), output: output });
    console.log(output.join(' '));
  }
  sound() {
    return '';
  }
}

class Dog extends Animal {
  sound() {
    return 'bark'
  }
}

class Lion extends Animal {
  sound() {
    return 'roar'
  }
}

class Tiger extends Animal {
  sound() {
    return 'grrr'
  }
}

new Tiger().speak('Lions suck');
new Lion().speak('I\'m a lion');
new Dog().speak('Are you eating that?');
