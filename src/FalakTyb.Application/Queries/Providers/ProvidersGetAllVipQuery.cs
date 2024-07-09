
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllVipQuery : IRequest<IEnumerable<Providers>>
    {

    }
}
