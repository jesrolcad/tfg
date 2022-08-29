import { shallowMount } from '@vue/test-utils';
import InsigniasShow from 'InsigniasShow.vue';
import flushPromises from 'flush-promises';


const mockInsignias = [
    "List Beginner",
    "Bronce List",
    "List Expert",
    "List Freak"
]

const mockInsigniasAll = [
    {
        "_id": "62dd35dedc39231374227bdb",
        "nombre": "List Beginner",
        "insignia": "https://i.imgur.com/o7qifAw.png"
    },
    {
        "_id": "62dd35dedc39231374227be1",
        "nombre": "Actor/Actress Fan",
        "insignia": "https://i.imgur.com/T1jY1dM.png"
    },
    {
        "_id": "62dd35dedc39231374227be5",
        "nombre": "Silver List",
        "insignia": "https://i.imgur.com/qGHtcsH.png"
    },
    {
        "_id": "62dd35dedc39231374227bd9",
        "nombre": "Silver Watcher",
        "insignia": "https://i.imgur.com/BbFUa6T.png"
    },
    {
        "_id": "62dd35dedc39231374227bda",
        "nombre": "Gold Watcher",
        "insignia": "https://i.imgur.com/YwwpTno.png"
    },
    {
        "_id": "62dd35dedc39231374227be4",
        "nombre": "Bronce List",
        "insignia": "https://i.imgur.com/cgICRZW.png"
    },
    {
        "_id": "62dd35dedc39231374227bd8",
        "nombre": "Bronce Watcher",
        "insignia": "https://i.imgur.com/twiQDTd.png"
    },
    {
        "_id": "62dd35dedc39231374227bdc",
        "nombre": "List Expert",
        "insignia": "https://i.imgur.com/psA2RHp.png"
    },
    {
        "_id": "62dd35dedc39231374227bdd",
        "nombre": "List Freak",
        "insignia": "https://i.imgur.com/qK6LWiM.png"
    },
    {
        "_id": "62dd35dedc39231374227bde",
        "nombre": "Amateur Genre Watcher",
        "insignia": "https://i.imgur.com/eDQOH2f.png"
    },
    {
        "_id": "62dd35dedc39231374227bdf",
        "nombre": "Intermediate Genre Watcher",
        "insignia": "https://i.imgur.com/J62ID6O.png"
    },
    {
        "_id": "62dd35dedc39231374227be0",
        "nombre": "Professional Genre Watcher",
        "insignia": "https://i.imgur.com/k7zzxpW.png"
    },
    {
        "_id": "62dd35dedc39231374227be2",
        "nombre": "Actor/Actress Lover",
        "insignia": "https://i.imgur.com/9pOj2PA.png"
    },
    {
        "_id": "62dd35dedc39231374227be3",
        "nombre": "Actor/Actress Addict",
        "insignia": "https://i.imgur.com/ttU2Ljb.png"
    },
    {
        "_id": "62dd35dedc39231374227be6",
        "nombre": "Gold List",
        "insignia": "https://i.imgur.com/YYwxEAd.png"
    }
]

describe('TESTS INSIGNIASSHOW', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('COMPROBAR QUE SE ASIGNAN LAS INSIGNIAS EN EL MÉTODO CREATED', () => {
        it('CASO GENERAL', async () => {

            fetch.mockResponses([JSON.stringify(mockInsignias)], [JSON.stringify(mockInsigniasAll)]);

            const mockGetInsignias = jest.spyOn(InsigniasShow.methods, 'getInsignias');
            const mockGetInsigniasAll = jest.spyOn(InsigniasShow.methods, 'getInsigniasAll');
            
            const wrapper = shallowMount(InsigniasShow);

            await flushPromises();

            expect(mockGetInsignias).toHaveBeenCalled();
            expect(mockGetInsigniasAll).toHaveBeenCalled();
            expect(wrapper.vm.insignias).toEqual(mockInsignias);
            expect(wrapper.vm.insigniasALL).toEqual(mockInsigniasAll);
            
        })
    })
})