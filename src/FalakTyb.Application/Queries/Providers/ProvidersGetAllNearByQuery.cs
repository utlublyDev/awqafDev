using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllNearByQuery : IRequest<List<Providers>>
    {
        public IPageable Page { get; set; }
         public long CategoryId { get; set; }
public double Latitude { get; set; }
public double Longitude { get; set; }
public int Radius { get; set; }


    }
}