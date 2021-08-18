'use strict';

let superTest = require('supertest');
const server = require('../src/server');
const mockReq = superTest(server.server);


let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  writer: { username: 'writer', password: 'password', role: 'writer' },  
  user: { username: 'user', password: 'password', role: 'user' },
};



describe('V1 Routes', () => {

  it('can post a new food item', async() => {
    let obj = { name: 'test_food_1', calories: 9999, type: 'FRUIT' };
    let expected = { name: 'test_food_1', calories: 9999, type: 'FRUIT' };

    const response = await mockReq.post('/api/v1/food').send(obj);
    const foodObject = response.body;

    expect(response.status).toBe(201);
    expect(foodObject.id).toBeDefined();
    expect(foodObject.name).toEqual(expected.name)
    Object.keys(expected).forEach(item => {
          expect(foodObject[item]).toEqual(expected[item])
    });
  });

  it('can get a food item', async() => {
    let obj = { name: 'test_food_2', calories: 9999, type: 'VEGETABLE' };
    let expected = { name: 'test_food_2', calories: 9999, type: 'VEGETABLE' };

    const response = await mockReq.post('/api/v1/food').send(obj);
    const foodObject = response.body;
    const res = await mockReq.get(`/api/v1/food/${foodObject.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(foodObject.id);
    Object.keys(expected).forEach(item => {
          expect(res.body[item]).toEqual(expected[item])
    });
  });

  it('can get all food items', async() => {
    let obj = { name: 'test_food_3', calories: 9999, type: 'VEGETABLE' };
    let obj2 = { name: 'test_food_4', calories: 9999, type: 'PROTIEN' };

    await mockReq.post('/api/v1/food').send(obj);
    await mockReq.post('/api/v1/food').send(obj2);
    const res = await mockReq.get(`/api/v1/food/`);
    expect(res.status).toBe(200);
    Object.keys(obj).forEach(item => {
          expect(res.body[2][item]).toEqual(obj[item])
    });
    expect(res.body[0].name).toEqual('test_food_1');
    expect(res.body[1].name).toEqual('test_food_2');
    expect(res.body[2].name).toEqual('test_food_3');
    expect(res.body[3].name).toEqual('test_food_4');
   
  });

  it('can update() a food item', async() => {
    let obj = { name: 'test_food_5', calories: 9999, type: 'PROTIEN' };
    let updatedObj = { name: 'test_food_5', calories: 9999, type: 'VEGETABLE' };
    let expected = { name: 'test_food_5', calories: 9999, type: 'VEGETABLE' };

    const response1 = await mockReq.post('/api/v1/food').send(obj);
    const response = await mockReq.put(`/api/v1/food/${response1.body.id}`).send(updatedObj);
    
    expect(response.status).toBe(200);
    
    Object.keys(expected).forEach(item => {
      expect(response.body[item]).toEqual(expected[item])
    });
    
  });

  it('can delete() a food item', async() => {
    let obj = { name: 'test_food_6', calories: 9999, type: 'VEGETABLE' };
    let expected = { name: 'test_food_6', calories: 9999, type: 'VEGETABLE' };
    const response1 = await mockReq.post('/api/v1/food').send(obj);
    const response2 = await mockReq.delete(`/api/v1/food/${response1.body.id}`);
    expect(response2.status).toBe(200);
    // Object.keys(expected).forEach(item => {
    //   expect(response2.body[item]).toEqual(expected[item])
    // });
  });
        
});

// describe('admin', () => {
//   let token;
//   let id;

//   it('sign up', async () => {
//     const res = await mockReq.post('/signup').send({ username: 'testing-user9', password: 'testing-password1', role: 'admin' });
//     expect(res.status).toEqual(201);
//   });

//   it('sign in', async () => {
//     const res = await mockReq.post('/signin').auth('testing-user1', 'testing-password1');
//     const token_1 = res.body.token;
//     expect(res.status).toEqual(200);
//     expect(res.body.user.role).toEqual('admin');
//     expect(res.body.token).toEqual(token_1);
//   });

//   it('POST', async () => {
//     const res = await mockReq.post('/api/v1/food').send({
//       name: 'apple',
//       calories: 60,
//       type: 'FRUIT',
//     }).set({ Authorization: `Bearer ${token}` });
//     expect(res.status).toEqual(201);
//     expect(res.body.id).toBeDefined();
//     expect(res.body.name).toEqual('apple');
//     expect(res.body.type).toEqual('FRUIT');
//     id = res.body.id;
//   });

//   it('GET all', async () => {
//     const res = await mockReq.get('/api/v1/food');
//     expect(res.status).toEqual(200);
//     expect(res.body[0].id).toBeDefined();
//     expect(res.body[0].name).toEqual('apple');
//     expect(res.body[0].type).toEqual('FRUIT');
//     expect(res.body.length).toEqual(1);
//   });

//   it('GET one', async () => {
//     const res = await mockReq.get(`/api/v1/food/${id}`);
//     expect(res.status).toEqual(200);
//     expect(res.body.id).toBeDefined();
//     expect(res.body.name).toEqual('apple');
//     expect(res.body.type).toEqual('FRUIT');
//     expect(res.body.id).toEqual(id);
//   });

//   it('PUT', async () => {
//     const res = await mockReq.put(`/api/v1/food/${id}`).send({
//       name: 'tomato',
//       calories: 500,
//       type: 'VEGETABLE',
//     }).set({ 'Authorization': `Bearer ${token}` });
//     expect(res.status).toEqual(200);
//     expect(res.body.id).toBeDefined();
//     expect(res.body.name).toEqual('tomato');
//     expect(res.body.type).toEqual('VEGETABLE');
//     expect(res.body.calories).not.toEqual(60);
//     expect(res.body.id).toEqual(id);
//   });

//   it('DELETE', async () => {
//     const res = await mockReq.delete(`/api/v1/food/${id}`).set({ 'Authorization': `Bearer ${token}` });
//     expect(res.status).toEqual(200);
//     const res1 = await mockReq.get(`/api/v1/food/${id}`);
//     expect(res1.status).toEqual(200);
//     expect(res1.body).toEqual(null);
//     const res2 = await mockReq.get('/api/v1/food/');
//     expect(res2.body.length).toEqual(0);
//   });
// });