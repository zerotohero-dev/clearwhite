const bar = () => Promise.reject();

const baz = () => Promise.resolve();

baz()
  .then(() => {
    return bar();
  })
  .catch(() => {
    console.log('outer caught');
  });

// const run = async () => {
//   try {
//     [1].forEach(async () => {
//       try {
//         const data = await bar(); // bar().then(() =>{}).catch(() => {})
//       } catch (e) {
//         console.log('inner caught');
//       }
//     });
//   } catch (ex) {
//     console.log('caught');
//   }
// };
//
// run();
