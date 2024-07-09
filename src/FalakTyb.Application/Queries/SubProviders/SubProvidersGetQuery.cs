
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class SubProvidersGetQuery : IRequest<SubProviders>
    {
        public long Id { get; set; }
    }
}
