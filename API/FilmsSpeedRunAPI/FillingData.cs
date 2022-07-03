using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI
{
    public class FillingData
    {
        public static void Fill(FilmContext context)
        {
            context.Roles.Add(new Role() { Name = "user" });
            context.Roles.Add(new Role() { Name = "admin" });
            context.SaveChanges();

            context.Users.Add(new User() { Login = "admin", PasswordHash = "a15bbc069bb0af781273e9d4021ec83c", RoleId = 2 });
            List<Film> films = new List<Film>() {
                new Film()
                {
                    Title = "Лига справедливости Зака Снайдера",
                    Image = "https://upload.wikimedia.org/wikipedia/ru/3/38/%D0%9B%D0%B8%D0%B3%D0%B0_%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%B5%D0%B4%D0%BB%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%B8_%D0%97%D0%B0%D0%BA%D0%B0_%D0%A1%D0%BD%D0%B0%D0%B9%D0%B4%D0%B5%D1%80%D0%B0.png",
                    Description = @"Долгожданная оригинальная версия фильма «Лига Справедливости» (2017), которую Зак Снайдер планировал снять до своего ухода с поста режиссёра. Режиссер принял решение смонтировать фильм в обожаемом им формате 4:3. После героического самопожертвования Супермена Брюс Уэйн заново обретает веру в людей. С помощью Чудо-женщины Бэтмен набирает супергероев в Лигу Справедливости, чтобы вместе сразиться с могущественным Степным волком.
                                    После смерти Супермена мир переживает не лучшие времена: в обществе царит напряжение, а богатым и властным людям, у которых есть влияние и сила, сходят с рук любые бесчинства. Луис Лейн, жена Супермена, больше не занимается громкими разоблачениями преступников и не пишет разгромные репортажи. Тем временем суперзлодей Степной волк, на стороне которого выступают летающие парадемоны, планирует превратить Землю в настоящий ад. Противостоять ему может лишь Бэтмен и его соратники. Вдохновлённый трагическим самопожертвованием Супермена, Брюс Уэйн вместе с Чудо-женщиной, Акваменом, бегуном Флэшем и компьютерным гением Киборгом выступают против Степного волка и его приспешников.
                                    Получится ли у Лиги Справедливости остановить злодеев и спасти мир? Приглашаем поклонников вселенной DC познакомиться с режиссёрской версией истории и посмотреть онлайн фильм «Лига справедливости Зака Снайдера».",
                    Rating = 8.2,
                    DateOfPublishing = new DateTime(2021, 3, 18),
                    Actors = new List<Actor>()
                        {
                            new Actor() { Name = "Генри Кавилл", Image = "https://www.google.com/search?q=%D0%93%D0%B5%D0%BD%D1%80%D0%B8+%D0%9A%D0%B0%D0%B2%D0%B8%D0%BB%D0%BB&sa=X&rlz=1C1CHZN_ruUA957UA957&stick=H4sIAAAAAAAAAAFHALj_CAMSDS9nLzExajEyMHkzZjAiCS9tLzA3MGM5aCoMTW92aWVUb0FjdG9yogUX0JPQtdC90YDQuCDQmtCw0LLQuNC70Lu4BQG6SyjCRwAAAA&biw=1536&bih=730&sxsrf=AOaemvLiGKJs1wTJB2kPWCg0giq1_lqHtQ:1638977092750&tbm=isch&source=iu&ictx=1&fir=XWzXPF0c1VMDHM%252CT7IEsVUw6mH1UM%252C%252Fm%252F070c9h%253BHgK6OJZrP5gMyM%252CfTSbrh48-NYBcM%252C_%253BCG5vgskMyAln6M%252CWdViJ-xtIYz3EM%252C_%253BzJjwRC4MKkY5lM%252CRWqDMp2W8CCq7M%252C_%253BFh_4gra9XD4FHM%252C5SzPjq2y5XVjZM%252C_%253BzzeL7D_GG_ph5M%252CfTSbrh48-NYBcM%252C_%253B_JHmmSjGP94MEM%252CW4aWvv6pPocMFM%252C_%253Bgx1sVuqwulq-oM%252C3b7LGctNiQRV7M%252C_&vet=1&usg=AI4_-kT5V-7H8bmuOWquTLnluwW_7Vy3RQ&ved=2ahUKEwjZr6G7wdT0AhWI8bsIHUW2CpQQ_B16BAhOEAE#imgrc=XWzXPF0c1VMDHM"},
                            new Actor() { Name = "Джаред Лето", Image = "https://www.google.com/search?q=%D0%94%D0%B6%D0%B0%D1%80%D0%B5%D0%B4+%D0%9B%D0%B5%D1%82%D0%BE&rlz=1C1CHZN_ruUA957UA957&stick=H4sIAAAAAAAAAAFIALf_CAMSDS9nLzExajEyMHkzZjAiCS9tLzAyZnlibCoMTW92aWVUb0FjdG9yogUV0JTQttCw0YDQtdC0INCb0LXRgtC-uAUBkAYB5W4S8UgAAAA&sxsrf=AOaemvIm_-Ryp6BR2RBnzvYLiRFZIqgdJA:1638977135941&tbm=isch&source=iu&ictx=1&fir=smKekjbSjCqXCM%252CZkCi5n_Zso0I8M%252C%252Fm%252F02fybl%253B05PTLa45leo6bM%252CGvlWYrKcgNl_3M%252C_%253BJA0Megl70yrzJM%252CZBaICtdSRoZ8yM%252C_%253BQrzkKBi3fXbCVM%252CNgnlH7EqP1lcZM%252C_%253BDgdakqs3tRhLuM%252C0BerAFyy5irAjM%252C_%253B2JzSmVSy4Ue-8M%252CZkCi5n_Zso0I8M%252C_%253B0GH8xI68erfZrM%252CoG-Opwe3dYJd_M%252C_&vet=1&usg=AI4_-kQjxmjeg0UNrPI6BSZXeR_t8rUoiw&sa=X&ved=2ahUKEwiu_enPwdT0AhVrg_0HHcH_BUAQ_B16BAgcEAE#imgrc=smKekjbSjCqXCM"},
                            new Actor() { Name = "Гарри Ленникс", Image = "https://www.google.com/search?q=%D0%93%D0%B0%D1%80%D1%80%D0%B8+%D0%9B%D0%B5%D0%BD%D0%BD%D0%B8%D0%BA%D1%81&rlz=1C1CHZN_ruUA957UA957&stick=H4sIAAAAAAAAAONgFuLVT9c3NMwyNDKoNE4zUOLUz9U3sEhPy83T4vHNL8tMDcl3TC7JL1rEKnlh8oUNFxsuNlzYoXBh9oWtF_YC4Y4Luy427mBlnMDGCABqwB8rTAAAAA&sxsrf=AOaemvJLg7aiwMa0Gt3LLBF67bLGZAo8_Q:1638977182928&tbm=isch&source=iu&ictx=1&fir=ZS3z1U2fWvGAlM%252C7tUIGJoLXuojLM%252C%252Fm%252F08gfmn%253BJ5Dkm5wwyNuW4M%252CaGoGZpmI2los3M%252C_%253Bq9rfLMAKsg4H8M%252CQ_nbvKPLaShTpM%252C_%253B8vYHrKYnBQ1XcM%252Ci-lnADpiPYjqAM%252C_%253BOwQ2wT2od_JGnM%252Chaf9UUJrwC77sM%252C_%253BDTNkEygut6n3pM%252CrhX3gr3nidZspM%252C_%253BkUggnx2BjaYg8M%252C0PibykkGLgctMM%252C_%253Bj3glfnkhTkicbM%252CmmlM2etD9pDKYM%252C_&vet=1&usg=AI4_-kSzrZll_in3rUUEyLIpTJ68afHn6g&sa=X&ved=2ahUKEwibnZ_mwdT0AhUIhP0HHcaXAcYQ_B16BAgkEAE#imgrc=ZS3z1U2fWvGAlM" },
                            new Actor() { Name = "Галь Гадот", Image = "https://m.media-amazon.com/images/M/MV5BYThjM2NlOTItYTUzMC00ODE3LTk1MTItM2I3MDViY2U3MThlXkEyXkFqcGdeQXVyMTg4NDI0NDM@._V1_UY317_CR20,0,214,317_AL_.jpg"},
                            new Actor() { Name = "Эми Адамс", Image = "https://m.media-amazon.com/images/M/MV5BMTg2NTk2MTgxMV5BMl5BanBnXkFtZTgwNjcxMjAzMTI@._V1_UX214_CR0,0,214,317_AL_.jpg"},
                            new Actor() { Name = "Джейсон Момоа", Image = "https://m.media-amazon.com/images/M/MV5BODJlNWQ4ZjUtYjRhNi00NGQ1LWE3YTItYjRmZGI3YzI4YTEyXkEyXkFqcGdeQXVyMTA2MDIzMDE5._V1_UY317_CR130,0,214,317_AL_.jpg"}
                        },
                    Directors = new List<Director>() { new Director() { Name = "Зак Снайдер" } },
                      Genres = new List<Genre>()
                        {
                            new Genre() { Name = "Фантастика" },
                            new Genre() { Name = "Приключения" }
                        },
                    Producers = new List<Producer>() 
                        {
                            new Producer() { Name = "Зак Снайдер", Image = "https://m.media-amazon.com/images/M/MV5BMTMzMjUyNjk1MV5BMl5BanBnXkFtZTcwMDc2Mzk3NA@@._V1_UY317_CR11,0,214,317_AL_.jpg" },
                            new Producer() { Name = "Джерри Сигел", Image = "https://m.media-amazon.com/images/M/MV5BMjY1MzJmMWUtNWQ1YS00MGNiLTljN2ItNGE5M2M2OTU5YjhiXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR22,0,214,317_AL_.jpg"},
                            new Producer() { Name = "Джо Шустер", Image = "https://m.media-amazon.com/images/M/MV5BMDdmMzA2MGYtZjFiZS00Nzg5LWE5MTctNTI0NWM4ZjI0YzdmXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR20,0,214,317_AL_.jpg"}
                        },
                    Company = new Company() { Name = "Warner Bros. Pictures", Description = "Warner Bros. Entertainment, Inc. (ранее Warner Bros. Pictures), (обычно называется Warner Bros., по-русски Братья Уо́рнер) — один из крупнейших концернов по производству фильмов и телесериалов в США. В настоящее время подразделение группы компаний WarnerMedia с офисом в Калифорнии"}
                },
                new Film()
                {
                    Title = "Железный человек",
                    Image = "https://www.google.com/search?q=%D0%B6%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D1%8B%D0%B9+%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA&rlz=1C1CHZN_ruUA957UA957&sxsrf=AOaemvITzGqhjZSiTNXayWhGvhHn2xrnJA:1638990503903&tbm=isch&source=iu&ictx=1&fir=51TFu4U6M_qVLM%252CzalPuSLEUEfxkM%252C%252Fm%252F0dzlbx%253B_dlYZP9NECFL0M%252C6ifAITmCuqSoIM%252C_%253BMM1cqFAh0tXvkM%252CxCiG9MLEGUmYUM%252C_%253BL0tD24UFJ97PSM%252CziOO0fNLjGQ-3M%252C_%253BnGbG-CD_jDL3UM%252CMlhZsQ-9VgszXM%252C_%253BKPYHHTOOcVFsNM%252C2W_AJysgIicRTM%252C_%253BIEIkRt0MIF74VM%252CZsoYjAr7hdbwaM%252C_%253B_S11TIt-OZI7jM%252CusUAtkOC1XUthM%252C_%253BYYrk33hu2-Un3M%252CzalPuSLEUEfxkM%252C_&vet=1&usg=AI4_-kR9pzWaI_LdxggDh5uMTJn0bkcTmg&sa=X&ved=2ahUKEwjWr5m289T0AhVO_rsIHZd5AA0Q_B16BAhVEAE#imgrc=51TFu4U6M_qVLM",
                    Description = @"Тони Старк — владелец крупной корпорации под названием «Старк Индастриз». Фирма проектирует, производит и поставляет оружие для ВС США. В свободное от работы время Тони ведет довольно беззаботный образ жизни и является завсегдатаем алковечеринок. Однако после некоторых событий Старк кардинально меняет образ жизни.
                                    Исследователь прибывает в Афганистан, чтобы презентовать там новую ракету под названием «Иерихон». Вместе с помощником его похищают террористы. Во время нападения главного героя ранит его же оружие, однако Старку удается выжить. Тони прекрасно понимает — его похитили для того, чтобы заставить работать на исламистов. Мужчина решает спасаться бегством.
                                    Тони разрабатывает уникальные железные доспехи, надев которые, ему удается вырваться из плена. После этого Старк возвращается на родину, чтобы найти заказчика похищения и расквитаться с ним. Теперь у него на вооружении находится суперсовременный бронированный костюм, а самого Тони называют не иначе, как Айронмен. В дальнейшем мужчина решает использовать свои доспехи на благо человечества и больше никогда не производить оружие.",
                    Rating = 7.6,
                    DateOfPublishing = new DateTime(2018, 4, 30),
                      Genres = new List<Genre>()
                        {
                            new Genre() { Name = "Фантастика" },
                            new Genre() { Name = "Боевики" },
                            new Genre() { Name = "Приключения" }
                        },
                    Actors = new List<Actor>()
                        {
                            new Actor() { Name = "Роберт Дауни мл.", Image = "https://www.google.com/search?q=%D0%A0%D0%BE%D0%B1%D0%B5%D1%80%D1%82+%D0%94%D0%B0%D1%83%D0%BD%D0%B8+%D0%BC%D0%BB.&rlz=1C1CHZN_ruUA957UA957&sxsrf=AOaemvJ-lcloU6IzsaMiD3FuFcmERNvNKQ:1638990653260&tbm=isch&source=iu&ictx=1&fir=1VLrpbMqSgzG0M%252Ci1XFQfkOhLUyrM%252C%252Fm%252F016z2j%253By3GTjTBLQfooTM%252CfZT_HSzu_3dQEM%252C_%253BAEWYSJC6JtwvaM%252Cb7tz75Sv5FltoM%252C_%253Bj1WXIuwnp0xSHM%252Cp7y05Va4M193vM%252C_%253BquGhu0KEe44zUM%252Cx64pWBbD8C4JGM%252C_%253BREacaKWTNI5IMM%252CDchhLpdn2Hci9M%252C_%253B1lVMtVUbS2SFnM%252C_FLfipWpxqNx0M%252C_%253B5-k8VM2mIDU3LM%252CD7zSBFYdc-35SM%252C_&vet=1&usg=AI4_-kTEs6MG05rOtrfcs12Vuon9M85N0Q&sa=X&ved=2ahUKEwiKz7X989T0AhWx8bsIHYWIDV0Q_B16BAhPEAE#imgrc=1VLrpbMqSgzG0M"},
                            new Actor() { Name = "Терренс Ховард", Image = "https://www.google.com/search?q=%D0%A2%D0%B5%D1%80%D1%80%D0%B5%D0%BD%D1%81+%D0%A5%D0%BE%D0%B2%D0%B0%D1%80%D0%B4&rlz=1C1CHZN_ruUA957UA957&sxsrf=AOaemvKWyzl_4ScAJbDurOXOHGQcvmc64w:1638990689904&tbm=isch&source=iu&ictx=1&fir=dUAIzMX71blszM%252C09tmEtNa9mSR9M%252C%252Fm%252F06g2d1%253BJBwxTpXlP3S-wM%252C9VIpDd8kQmBAGM%252C_%253Bwk5cK-pVjU74fM%252CZGSymBYB8b4wQM%252C_%253Bnx4I2R4pub0xUM%252Cf2H86QtXV5DeTM%252C_%253B2n4qrrKyfjU9VM%252CP-mSknP7YKK_IM%252C_%253B6uEVIMp5YixWlM%252CsI0J13sj4V4iJM%252C_%253B_5X3AocND3KB6M%252CZGSymBYB8b4wQM%252C_%253B4E6kEv8vEyqpWM%252C7BsWf1FN3yR1DM%252C_%253BX_Uuj0MSYMRTrM%252C37Yi05WM7fWEHM%252C_%253B07yg1qoHfcqlpM%252CVtSU6W_-qFoEmM%252C_&vet=1&usg=AI4_-kQILgvW0h850WQAltbl_wj7gYHbrQ&sa=X&ved=2ahUKEwi81_GO9NT0AhXc7rsIHZiBCHoQ_B16BAhSEAE#imgrc=dUAIzMX71blszM"},
                            new Actor() { Name = "Джон Фавро", Image = "https://www.google.com/search?q=%D0%94%D0%B6%D0%BE%D0%BD+%D0%A4%D0%B0%D0%B2%D1%80%D0%BE&rlz=1C1CHZN_ruUA957UA957&sxsrf=AOaemvI08Yo9Lfwc8EfeLjZmIq7j1_iXPA:1638990707652&tbm=isch&source=iu&ictx=1&fir=T__qJbfOjiSdMM%252C4gXTIenzB9veDM%252C%252Fm%252F01twdk%253B_lnNX-tZy78S4M%252C3lob3u9JHww0wM%252C_%253BYdc1Fjm1r-jDnM%252CrB9Ze6Nw7eS68M%252C_%253BiwbkgFYMReB9aM%252CrB9Ze6Nw7eS68M%252C_%253BHQc7fa7oExqaiM%252C_Gex8NDRefblsM%252C_%253B1bdvnT0bUFzWbM%252CrB9Ze6Nw7eS68M%252C_%253BBAMiTyCE0oDVSM%252CwB0Ks12E-zBtGM%252C_%253B6xteAJJ7IyMFQM%252CJLLSdAZNlv9ndM%252C_&vet=1&usg=AI4_-kTQiQr7A-DN-GJV6gEITT8UoDLlEA&sa=X&ved=2ahUKEwjW_ayX9NT0AhVI_7sIHaJ1Dd8Q_B16BAhLEAE#imgrc=T__qJbfOjiSdMM" }
                        },
                    Directors = new List<Director>() { new Director() { Name = "Джон Фавро" } },
                    Producers = new List<Producer>()
                        {
                            new Producer() { Name = "Кевин Файги", Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kevin_Feige_%2848462887397%29_%28cropped%29.jpg/330px-Kevin_Feige_%2848462887397%29_%28cropped%29.jpg" },
                            new Producer() { Name = "Ави Арад", Image = "https://upload.wikimedia.org/wikipedia/commons/7/77/Avi_Arad%2C_June_2012.jpg"}
                        },
                    Company = new Company() { Name = "Marvel Studios", Description = "Marvel Studios, LLC (первоначально известная как Marvel Films с 1993 до 1996 года) — американская киностудия, располагающаяся в The Walt Disney Studios, Бербанк, штат Калифорния. Является дочерней компанией Walt Disney Studios, которая принадлежит медиаконгломерату The Walt Disney Company. Президентом киностудии является кинопродюсер Кевин Файги. Ранее студия была дочерним предприятием Marvel Entertainment, пока The Walt Disney Company не реорганизовала компании в августе 2015 года."}
                },
                new Film()
                {
                    Title = "Капитан Америка",
                    Image = "data:image/jpeg;base64,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",
                    Description = @"Щедро начиненный спецэффектами приключенческий экшн про самого патриотичного супергероя марвеловскоских комиксов Капитана Америку от художника-концептуалиста первых «Звездных войн» и режиссера «Джуманджи» и «Человека-волка» Джо Джонстона. Тщедушный Стив Роджерс мечтает присоединиться к добровольцам, отправляющимся на фронт Второй мировой. Но раз за разом комиссия признает его негодным для службы по состоянию здоровья. При пятой попытке попасть в ряды защитников отечества настырного молодого человека замечает профессор Авраам Эрскин, работающий над секретной правительственной программой по созданию команды суперсолдат. Благодаря сыворотке и специальному облучению, разработанным Эрскиным при технической поддержке Говарда Старка, Стив превращается в практически неуязвимого человека, чьей униформой становится комбинезон в цвет американского флага и круглый щит, а главным противником – бесчеловечный Иоганн Шмитдт, приспешник Гитлера, который тоже мечтает о мировом господстве. Если вам интересно узнать, как сложится судьба главного героя, рекомендуем смотреть онлайн «Первый мститель».",
                    Rating = 8.3,
                    DateOfPublishing = new DateTime(1918, 7, 4),
                    Genres = new List<Genre>()
                        {
                            new Genre() { Name = "Фантастика" },
                            new Genre() { Name = "Боевики" },
                            new Genre() { Name = "Приключения" }
                        },
                    Actors = new List<Actor>()
                        {
                            new Actor() { Name = "Крис Эванс", Image = "data:image/jpeg;base64,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"},
                            new Actor() { Name = "Хейли Этвелл", Image = "https://thumbs.dfs.ivi.ru/storage9/contents/f/f/5cda065db9415edc48f03b34706b0c.jpg"},
                            new Actor() { Name = "Томми Ли Джонс", Image = "https://thumbs.dfs.ivi.ru/storage2/contents/8/4/09a183053c8a3fd67b283554a4a3e2.jpg" },
                            new Actor() { Name = "Хьюго Уивинг", Image = "https://thumbs.dfs.ivi.ru/storage32/contents/8/0/99b133185f1cf29fcb43757f5401f9.jpg" }
                        },
                    Directors = new List<Director>() { new Director() { Name = "Джо Джонстон" } },
                    Producers = new List<Producer>()
                        {
                            new Producer() { Name = "Кевин Файги", Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kevin_Feige_%2848462887397%29_%28cropped%29.jpg/330px-Kevin_Feige_%2848462887397%29_%28cropped%29.jpg" }
                        },
                    Company = new Company() { Name = "Marvel Studios", Description = "Marvel Studios, LLC (первоначально известная как Marvel Films с 1993 до 1996 года) — американская киностудия, располагающаяся в The Walt Disney Studios, Бербанк, штат Калифорния. Является дочерней компанией Walt Disney Studios, которая принадлежит медиаконгломерату The Walt Disney Company. Президентом киностудии является кинопродюсер Кевин Файги. Ранее студия была дочерним предприятием Marvel Entertainment, пока The Walt Disney Company не реорганизовала компании в августе 2015 года."}
                },
                new Film()
                {
                    Title = "Соник в кино",
                    Image = "https://kinogo.zone/uploads/posts/2021-06/1622997362_sonic-the-hedgehog-sonik-v-kino-2020.jpg",
                    Description = @"Легендарная игра на приставке Сега -
Соник появится в кино. И это будет просто красочный шедевр
который ждали много поклонников. Приключения Соника икс
и его лучшего друга Тейлза, Эми и Крим против злодея гения
Эггмана вовлекут вас в мир фантазии всех искушенных
зрителей этого жанра. Вы увидите как ваши любимые герои
спасут мир",
                    Rating = 7.5,
                    DateOfPublishing = new DateTime(2020,1,1 ),
                    Genres = new List<Genre>()
                        {
                            new Genre() { Name = "Боевики" },
                            new Genre() { Name = "Мультфильмы" },
                            new Genre() { Name = "Приключения" },
                        },
                    Actors = new List<Actor>()
                        {
                            new Actor() { Name = "Джеймс Марсден", Image = "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/efae4ec1-ae0f-4944-89b1-8119c7947cd2/280x420" },
                            new Actor() { Name = "Лиэнн Лэпп", Image = "https://www.film.ru/sites/default/files/persones/_imported/3060342.jpg" },
                            new Actor() { Name = "Эльфина Люк ", Image = "https://www.kinonews.ru/insimgs/2019/persimg/persimg36696.jpg" },
                            new Actor() { Name = "Дебс Ховард ", Image = "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/b7fcad05-7f47-4f2e-8a3e-ef88eb170daf/360" },
                        },
                    Directors = new List<Director>() {
                        new Director() { Name = "Джефф Фаулер" }
                    },
                    Company = new Company() { Name = "Warner Bros. Pictures", Description = "Warner Bros. Entertainment, Inc. (ранее Warner Bros. Pictures), (обычно называется Warner Bros., по-русски Братья Уо́рнер) — один из крупнейших концернов по производству фильмов и телесериалов в США. В настоящее время подразделение группы компаний WarnerMedia с офисом в Калифорнии"}


                },
                new Film()
                {
                    Title = "Поиск",
                    Image = "https://hd-1.videobox.cx/uploads/mini/poster/bd/970196_1607537778.webp",
                    Description = @"16-летняя дочь Дэвида Кима пропадает без следа. Чтобы дать полиции зацепки, отчаявшийся отец взламывает компьютер девочки и понимает, что ничего не знает о собственной дочери.",
                    Rating = 7.4,
                    DateOfPublishing = new DateTime(2018,1,1 ),
                    Genres = new List<Genre>()
                        {
                            new Genre() { Name = "Детектив" },
                            new Genre() { Name = "Драма" },
                        },
                    Actors = new List<Actor>()
                        {
                            new Actor() { Name = "Джон Чо", Image = "https://kinoafisha.ua/upload/persons/3575/src_1yvf0xu5djon-co.jpg" },
                            new Actor() { Name = "Сара Сон", Image = "https://www.film.ru/sites/default/files/people/02_sara-mibo-sohn-privy.jpg" },
                            new Actor() { Name = "Алекс Джейн Гоу", Image = "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/1bb9e468-be9c-4f97-aa6f-8ee85c5638e8/360" },
                            new Actor() { Name = "Меган Лью", Image = "https://images.kinorium.com/persona/180/3362960.jpg?1547639944" },
                        },
                    Directors = new List<Director>() {
                        new Director() { Name = "Аниш Чаганти" }
                    },
                    Company = new Company() { Name = "Warner Bros. Pictures", Description = "Warner Bros. Entertainment, Inc. (ранее Warner Bros. Pictures), (обычно называется Warner Bros., по-русски Братья Уо́рнер) — один из крупнейших концернов по производству фильмов и телесериалов в США. В настоящее время подразделение группы компаний WarnerMedia с офисом в Калифорнии"}

                },
            };

            foreach (var f in films)
                context.Films.Add(f);
            context.SaveChanges();

            List<Selection> Selections = new List<Selection>() {
                new Selection(){
                    Name="Hot",UserId=1,
                    Films = new List<Film>()
                    {
                        context.Films.FirstOrDefault(x=>x.Id==1),
                        context.Films.FirstOrDefault(x=>x.Id==2),
                        context.Films.FirstOrDefault(x=>x.Id==3),
                    }
                },
                new Selection(){
                    Name="New",UserId=1,
                    Films = new List<Film>()
                    {
                        context.Films.FirstOrDefault(x=>x.Id==4),
                        context.Films.FirstOrDefault(x=>x.Id==2),
                        context.Films.FirstOrDefault(x=>x.Id==3),
                    }
                },
                new Selection(){
                    Name="Top-1",UserId=1,
                    Films = new List<Film>()
                    {
                        context.Films.FirstOrDefault(x=>x.Id==5),
                        context.Films.FirstOrDefault(x=>x.Id==3),
                        context.Films.FirstOrDefault(x=>x.Id==4),
                    }
                },
            };
            context.Selections.AddRange(Selections);
            context.SaveChanges();
        }
    }
}
