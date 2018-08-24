// https://gist.github.com/mauvm/172878a9646095d03fd7
import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();