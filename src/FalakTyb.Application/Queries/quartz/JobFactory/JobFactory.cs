﻿using Quartz;
using Quartz.Spi;
using System;
using System.Collections.Generic;
using System.Text;

namespace awqaf.JobFactory
{
   public class MyJobFactory : IJobFactory
    {
        public readonly IServiceProvider service;
        public MyJobFactory(IServiceProvider serviceProvider)
        {


            
            service = serviceProvider;
        }
        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            var jobDetail = bundle.JobDetail;
            
            return (IJob)service.GetService(jobDetail.JobType);
        }

        public void ReturnJob(IJob job)
        {
            
        }
    }
}
