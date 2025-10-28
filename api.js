async function getStreamingAvailability(tmdbId) {
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '1b319ce0f8msh3ba6dcae0cd68d6p1a059cjsn2670dd3e69b6',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(`https://streaming-availability.p.rapidapi.com/v2/get/basic?country=br&tmdb_id=${tmdbId}`, options);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }