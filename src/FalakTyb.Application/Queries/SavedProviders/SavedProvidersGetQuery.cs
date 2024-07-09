
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class SavedProvidersGetQuery : IRequest<SavedProviders>
    {
        public long Id { get; set; }
    }
}
