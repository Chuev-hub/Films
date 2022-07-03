using DAL.Context;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DAL
{
    public class IMDbService
    {
        List<Actor> Actors { get; set; } = new List<Actor>();
        List<Genre> Genres { get; set; } = new List<Genre>();
        List<Producer> Producers { get; set; } = new List<Producer>();
        List<Director> Directors { get; set; } = new List<Director>();
        Film Film { get; set; } = new Film();
        FilmContext context { get; set; }
        string key = "7ef43245c4mshac5fc45f9e208c9p1f232fjsn3025f98d6bf2";
        public async Task FillData(FilmContext context)
        {
            this.context = context;
            if (!context.Companies.Any(x => x.Name == "none"))
            {
                context.Companies.Add(new Company() { Name = "none", Description = "none" });
                context.SaveChanges();
            }
            Company companynone = context.Companies.FirstOrDefault(x => x.Name == "none");
            int companyid = companynone.Id;
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=UA&purchaseCountry=UA&currentCountry=UA"),
                Headers =
                    {
                        { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                        { "x-rapidapi-key", key },
                    },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                JArray mass = (JArray)JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                foreach(var obj in mass)
                {
                    string filmid = obj.ToString().Split(new char[] { '/' })[2];
                    SetGenresAndFilmData(filmid).Wait();
                    GetFilmDescription(filmid).Wait();
                    GetFullCredits(filmid).Wait();
                    Film.CompanyId = companyid;
                    context.Films.Add(Film);
                    context.SaveChanges();
                    Film = context.Films.FirstOrDefault(x => x.Title == Film.Title
                                                        && x.Image == Film.Image
                                                        && x.DateOfPublishing == Film.DateOfPublishing);
                    Film.Actors = Actors;
                    Film.Directors = Directors;
                    Film.Genres = Genres;
                    Film.Producers = Producers;
                    Film.Selections = new List<Selection>();
                    context.Films.Update(Film);
                    context.SaveChanges();
                    Clear();
                }
            }
        }
        async Task SetGenresAndFilmData(string id)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://imdb8.p.rapidapi.com/title/get-meta-data?ids=" + id + "&region=US"),
                Headers =
                    {
                        { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                        { "x-rapidapi-key", key },
                    },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                JObject obj = (JObject)JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                Film.Title = obj[id]["title"]["title"].ToString();
                Film.Rating = Convert.ToDouble(obj[id]["ratings"]["rating"]);
                Film.DateOfPublishing = Convert.ToDateTime(obj[id]["releaseDate"]);
                Film.Image = obj[id]["title"]["image"]["url"].ToString();
                foreach (string name in obj[id]["genres"])
                {
                    if (!context.Genres.Any(x => x.Name == name))
                        Genres.Add(new Genre() { Name = name });
                    else
                        Genres.Add(context.Genres.FirstOrDefault(x => x.Name == name));
                }
            }
        }
        async Task GetFilmDescription(string id)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://imdb8.p.rapidapi.com/title/get-plots?tconst=" + id),
                Headers =
                    {
                        { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                        { "x-rapidapi-key", key },
                    },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                JObject obj = (JObject)JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                Film.Description = obj["plots"][0]["text"].ToString();
            }
        }
        async Task GetFullCredits(string id)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=" + id),
                Headers =
                    {
                        { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                        { "x-rapidapi-key", key },
                    },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                JObject obj = (JObject)JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                List<string> actors = new List<string>();
                List<string> directors = new List<string>();
                List<string> producers = new List<string>();
                int i = 0;
                foreach (var actor in obj["cast"])
                {
                    if (i == 5)
                        break;
                    request = new HttpRequestMessage
                    {
                        Method = HttpMethod.Get,
                        RequestUri = new Uri("https://imdb8.p.rapidapi.com/actors/get-bio?nconst=" + actor["id"].ToString().Split(new char[] { '/'})[2]),
                        Headers =
                            {
                                { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                                { "x-rapidapi-key", key },
                            },
                    };
                    using (var resp = await client.SendAsync(request))
                    {
                        resp.EnsureSuccessStatusCode();
                        JObject obj1 = (JObject)JsonConvert.DeserializeObject(await resp.Content.ReadAsStringAsync());
                        if (context.Actors.Any(x => x.Name == obj1["name"].ToString()))
                            Actors.Add(context.Actors.FirstOrDefault(x => x.Name == obj1["name"].ToString()));
                        else
                        {
                            if (obj1["image"] != null)
                                context.Actors.Add(new Actor() { Name = obj1["name"].ToString(), Image = obj1["image"]["url"].ToString() });
                            else
                                context.Actors.Add(new Actor() { Name = obj1["name"].ToString(), Image = "data:image/jpeg;base64,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" });
                            context.SaveChanges();
                            Actors.Add(context.Actors.FirstOrDefault(x => x.Name == obj1["name"].ToString()));
                        }
                    }
                    i++;
                }
                i = 0;
                foreach (var director in obj["crew"]["director"])
                {
                    if (i == 2)
                        break;
                    if (context.Directors.Any(x => x.Name == director["name"].ToString()))
                        Directors.Add(context.Directors.FirstOrDefault(x => x.Name == director["name"].ToString()));
                    else
                    {
                        context.Directors.Add(new Director() { Name = director["name"].ToString() });
                        context.SaveChanges();
                        Directors.Add(context.Directors.FirstOrDefault(x => x.Name == director["name"].ToString()));
                    }
                    i++;
                }
                i = 0;
                foreach (var producer in obj["crew"]["producer"])
                {
                    if (i == 2)
                        break;
                    request = new HttpRequestMessage
                    {
                        Method = HttpMethod.Get,
                        RequestUri = new Uri("https://imdb8.p.rapidapi.com/actors/get-bio?nconst=" + producer["id"].ToString().Split(new char[] { '/' })[2]),
                        Headers =
                        {
                            { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                            { "x-rapidapi-key", key },
                        },
                    };
                    using (var resp = await client.SendAsync(request))
                    {
                        resp.EnsureSuccessStatusCode();
                        JObject obj1 = (JObject)JsonConvert.DeserializeObject(await resp.Content.ReadAsStringAsync());
                        if (context.Producers.Any(x => x.Name == obj1["name"].ToString()))
                            Producers.Add(context.Producers.FirstOrDefault(x => x.Name == obj1["name"].ToString()));
                        else
                        {
                            if (obj1["image"] != null)
                                context.Producers.Add(new Producer() { Name = obj1["name"].ToString(), Image = obj1["image"]["url"].ToString() });
                            else
                                context.Producers.Add(new Producer() { Name = obj1["name"].ToString(), Image = "data:image/jpeg;base64,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" });
                            context.SaveChanges();
                            Producers.Add(context.Producers.FirstOrDefault(x => x.Name == obj1["name"].ToString()));
                        }
                    }
                    i++;
                }

            }
        }
        void Clear()
        {
            this.Genres = new List<Genre>();
            this.Actors = new List<Actor>();
            this.Directors = new List<Director>();
            this.Producers = new List<Producer>();
            Film = new Film();
        }
    }
}
