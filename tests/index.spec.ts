import 'mocha';
import { assert } from 'chai';

import InMemoryCache, { InMemoryCacheItem } from '../src/index';
import npmPackage from '../src/index';
import { afterEach } from 'mocha';

describe('NPM Package', () => {
    it('should be an object', () => {
        assert.instanceOf(new npmPackage(), InMemoryCache);
    });

    // it('should have a InMemoryCache property', () => {
    //     assert.property(npmPackage, 'InMemoryCache');
    // });
});

describe('InMemoryCache Class', () => {
    // it('should be a function', () => {
    //     assert.isFunction(helloWorld);
    // });
    type inMemoryCacheType = { key: string, value: number };

    let inMemoryCache: InMemoryCache<inMemoryCacheType> | null;

    beforeEach(() => inMemoryCache = new InMemoryCache<inMemoryCacheType>());

    afterEach(() => inMemoryCache = null);

    it('should set a value and return the value', () => {
        inMemoryCache!.set('value', { key: 'data', value: 10 })

        const expected = { key: 'data', value: 10 };
        const actual = inMemoryCache!.get('value');

        assert.deepEqual(actual, expected);
    });

    it('should set a value and check that the value exists', () => {
        inMemoryCache!.set('value', { key: 'data', value: 10 })

        assert.isTrue(inMemoryCache!.has('value'));
        assert.isNotTrue(inMemoryCache!.has('valueZlich'));
    });

    it('should set a value and expiry, then return the value', () => {
        inMemoryCache!.set('value', { key: 'data', value: 10 }, 2)

        const expected = { key: 'data', value: 10 };
        const actual = inMemoryCache!.get('value');

        assert.deepEqual(actual, expected);
    });

    it('should return undefined for an expired value', function (done) {
        this.timeout(5000);

        inMemoryCache!.set('value', { key: 'data', value: 10 }, 2);

        global.setTimeout(
            () => {
                assert.equal(inMemoryCache!.get('value'), undefined);

                done();
            },
            3000,
        );
    });

    it('should delete specific keys and leave others', () => {
        inMemoryCache!.set('value1', { key: 'data1', value: 10 }, 2);
        inMemoryCache!.set('value2', { key: 'data2', value: 11 });
        inMemoryCache!.set('value3', { key: 'data3', value: 12 }, 9);
        inMemoryCache!.set('value4', { key: 'data4', value: 13 }, 2);

        inMemoryCache!.del('value1');
        inMemoryCache!.del('value3');

        assert.deepEqual(inMemoryCache!.get('value1'), undefined);
        assert.deepEqual(inMemoryCache!.get('value2'), { key: 'data2', value: 11 });
        assert.deepEqual(inMemoryCache!.get('value3'), undefined);
        assert.deepEqual(inMemoryCache!.get('value4'), { key: 'data4', value: 13 });
    });

    it('should clear cache', () => {
        inMemoryCache!.set('value1', { key: 'data1', value: 10 }, 2);
        inMemoryCache!.set('value2', { key: 'data2', value: 11 });
        inMemoryCache!.set('value3', { key: 'data3', value: 12 }, 9);
        inMemoryCache!.set('value4', { key: 'data4', value: 13 }, 2);

        inMemoryCache!.clear();

        assert.deepEqual(inMemoryCache!.get('value1'), undefined);
        assert.deepEqual(inMemoryCache!.get('value2'), undefined);
        assert.deepEqual(inMemoryCache!.get('value3'), undefined);
        assert.deepEqual(inMemoryCache!.get('value4'), undefined);
    });
});

// describe('Goodbye Function', () => {
//     it('should be a function', () => {
//         assert.isFunction(goodBye);
//     });

//     it('should return the goodbye message', () => {
//         const expected = 'Goodbye from my example modern npm package!';
//         const actual = goodBye();
//         assert.equal(actual, expected);
//     });
// });