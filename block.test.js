const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
    const timestamp = '01/01/21';
    const lastHash = 'foo-lastHash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({ timestamp, lastHash, hash, data });

    it('Has a timestamp, lastHash and hash', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('It returns a new Block instance', () => {
            expect( genesisBlock instanceof Block ).toBe(true);
        });

        it('It returns the genesis data', () => {
            expect( genesisBlock ).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data });

        it('returns a new Block instance', () => {
            expect( minedBlock instanceof Block ).toBe(true);
        });

        it('Sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('Sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('Sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('Creates a SHA-256 `hash` based on the proper input', () => {
            expect(minedBlock.hash)
            .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
        });
    });
});