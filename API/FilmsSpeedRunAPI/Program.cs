using DAL;
using DAL.Context;
using DAL.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI
{
    public class Program
    {
        public static void Main(string[] args)
        { 
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                IMDbService ser = new IMDbService();
                var context = scope.ServiceProvider.GetRequiredService<FilmContext>();
                if (context.Roles.Count() == 0)
                {
                    FillingData.Fill(context);
                    ser.FillData(context).Wait();
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
