
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class MostRedeemsGetAllQuery : IRequest<IEnumerable<MostRedeem>>
    {
        public IPageable Page { get; set; }
    }
}
