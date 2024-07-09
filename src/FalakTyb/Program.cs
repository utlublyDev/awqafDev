using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.IO;
using System.Security.Authentication;
using JHipsterNet.Web.Logging;
using Serilog.Sinks.Syslog;
using ILogger = Serilog.ILogger;
using static JHipsterNet.Core.Boot.BannerPrinter;
using Microsoft.Extensions.Hosting;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;
using awqaf.JobFactory;
using awqaf.Jobs;
using awqaf.Application.Queries;
using awqaf.Schedular;
using awqaf.Models;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using awqaf.Controllers;



namespace awqaf
{
    public class Program
    {

        const string SerilogSection = "Serilog";
        const string SyslogPort = "SyslogPort";
        const string SyslogUrl = "SyslogUrl";
        const string SyslogAppName = "SyslogAppName";

        public static async Task Main(string[] args)
        {
           
         

            try
            {
                var appConfiguration = GetAppConfiguration();
                Log.Logger = CreateLogger(appConfiguration);
  var host = CreateHostBuilder(args).Build();
            var DateCheckerJob = CreateHostBuilder2(args).Build();

            await Task.WhenAny(
                host.RunAsync(), 
                DateCheckerJob.RunAsync()
            );
              
              
              // return 0;
            }
            catch (Exception ex)
            {
                // Use ForContext to give a context to this static environment (for Serilog LoggerNameEnricher).
                Log.ForContext<Program>().Fatal(ex, $"Host terminated unexpectedly");
           // return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
 


        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
                webBuilder.UseWebRoot(Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "dist"));
            }
            
            
            
            )
            .UseSerilog();

        /// <summary>
        /// Create application logger from configuration.
        /// </summary>
        /// <returns></returns>
        private static ILogger CreateLogger(IConfiguration appConfiguration)
        {
            var port = 6514;

            // for logger configuration
            // https://github.com/serilog/serilog-settings-configuration
            if (appConfiguration.GetSection(SerilogSection)[SyslogPort] != null)
            {
                if (int.TryParse(appConfiguration.GetSection(SerilogSection)[SyslogPort], out var portFromConf))
                {
                    port = portFromConf;
                }
            }

            var url = appConfiguration.GetSection(SerilogSection)[SyslogUrl] != null
                ? appConfiguration.GetSection(SerilogSection)[SyslogUrl]
                : "localhost";
            var appName = appConfiguration.GetSection(SerilogSection)[SyslogAppName] != null
                ? appConfiguration.GetSection(SerilogSection)[SyslogAppName]
                : "JhipsterApp";
            var loggerConfiguration = new LoggerConfiguration()
                .Enrich.With<LoggerNameEnricher>()
                .WriteTo.TcpSyslog(url, port, appName, FramingType.OCTET_COUNTING, SyslogFormat.RFC5424, Facility.Local0, SslProtocols.None)
                .ReadFrom.Configuration(appConfiguration);

            return loggerConfiguration.CreateLogger();
        }

  public static IHostBuilder CreateHostBuilder2(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddSingleton<IJobFactory, MyJobFactory>();
                    services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>();                    

                    #region Adding JobType
                    services.AddSingleton<NotificationJob>();
                    services.AddSingleton<LoggerJob>();
                    #endregion

                    #region Adding Jobs 
                    List<JobMetadata> jobMetadatas = new List<JobMetadata>();
                    jobMetadatas.Add(new JobMetadata(Guid.NewGuid(), typeof(NotificationJob), "Notify Job", "0 0 0 * * ?"));
                    jobMetadatas.Add(new JobMetadata(Guid.NewGuid(), typeof(LoggerJob), "Log Job", "0 0 0 * * ?"));
                
                    services.AddSingleton(jobMetadatas);
                    #endregion

                    services.AddHostedService<MySchedular>();
                });




        /// <summary>
        /// Gets the current application configuration
        /// from global and specific appsettings.
        /// </summary>
        /// <returns>Return the application <see cref="IConfiguration"/></returns>
        private static IConfiguration GetAppConfiguration()
        {
            // Actually, before ASP.NET bootstrap, we must rely on environment variable to get environment name
            // https://docs.microsoft.com/fr-fr/aspnet/core/fundamentals/environments?view=aspnetcore-2.2
            // Pay attention to casing for Linux environment. By default it's pascal case.
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{environment}.json", true)
                .AddEnvironmentVariables()
                .Build();
        }
    }
}
