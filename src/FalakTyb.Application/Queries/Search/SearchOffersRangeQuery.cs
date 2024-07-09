using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class SearchOffersRangeQuery : IRequest<IEnumerable<Offers>>
    {

        public int MinInput { get; set; }
        public int MaxInput { get; set; }
    }
}
