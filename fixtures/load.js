var fixtures = require('pow-mongodb-fixtures').connect('test');
import { data } from "./data";
export function loadData(cb) {
    fixtures.clearAndLoad({
        test: data
    }, cb);
}
