import app from './app';

// start server
app.listen(app.get('port'), (): void => {
  const url = `${app.get('host')}:${app.get('port')}`;
  console.log(`Server is running on: ${url}`);
});
